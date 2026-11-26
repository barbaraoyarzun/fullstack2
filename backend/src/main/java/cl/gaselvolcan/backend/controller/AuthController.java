package cl.gaselvolcan.backend.controller;

import cl.gaselvolcan.backend.dto.ApiDtos.AuthResponse;
import cl.gaselvolcan.backend.dto.ApiDtos.LoginRequest;
import cl.gaselvolcan.backend.dto.ApiDtos.RegistroRequest;
import cl.gaselvolcan.backend.model.Usuario;
import cl.gaselvolcan.backend.repository.UsuarioRepository;
import cl.gaselvolcan.backend.security.JwtService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@Tag(name = "1. Autenticación", description = "Endpoints públicos de inicio de sesión y registro con emisión de token JWT")
public class AuthController {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthController(
            UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService
    ) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    @Operation(summary = "Iniciar sesión", description = "Valida credenciales y retorna un token JWT junto a los datos y rol del usuario")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        return usuarioRepository.findByCorreo(request.correo())
                .filter(u -> passwordEncoder.matches(request.password(), u.getPassword()))
                .<ResponseEntity<?>>map(u -> {
                    String rolNormalizado = u.getRol().toUpperCase();
                    String token = jwtService.generarToken(u.getCorreo(), rolNormalizado);
                    return ResponseEntity.ok(new AuthResponse(
                            token, u.getId(), u.getRun(), u.getNombre(), u.getCorreo(), rolNormalizado
                    ));
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Correo o contraseña incorrectos")));
    }

    @PostMapping("/registro")
    @Operation(summary = "Registrar nuevo cliente", description = "Crea un usuario con rol CLIENTE, encripta su contraseña y devuelve su token JWT")
    public ResponseEntity<?> registrar(@RequestBody RegistroRequest request) {
        if (usuarioRepository.existsByCorreo(request.correo())) {
            return ResponseEntity.badRequest().body(Map.of("error", "El correo ya está registrado"));
        }

        Usuario nuevo = new Usuario();
        nuevo.setRun(request.run());
        nuevo.setNombre(request.nombre());
        nuevo.setCorreo(request.correo());
        nuevo.setPassword(passwordEncoder.encode(request.password()));
        nuevo.setRol("CLIENTE");

        Usuario guardado = usuarioRepository.save(nuevo);
        String token = jwtService.generarToken(guardado.getCorreo(), "CLIENTE");

        return ResponseEntity.status(HttpStatus.CREATED).body(new AuthResponse(
                token, guardado.getId(), guardado.getRun(), guardado.getNombre(), guardado.getCorreo(), "CLIENTE"
        ));
    }
}