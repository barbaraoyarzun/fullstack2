package cl.gaselvolcan.backend.controller;

import cl.gaselvolcan.backend.dto.ApiDtos.BoletaRequest;
import cl.gaselvolcan.backend.model.Boleta;
import cl.gaselvolcan.backend.repository.BoletaRepository;
import cl.gaselvolcan.backend.service.BoletaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/boletas")
@Tag(name = "4. Boletas y Órdenes", description = "Gestión de boletas y detalles de compra (requiere token JWT)")
public class BoletaController {

    private final BoletaRepository boletaRepository;
    private final BoletaService boletaService;

    public BoletaController(BoletaRepository boletaRepository, BoletaService boletaService) {
        this.boletaRepository = boletaRepository;
        this.boletaService = boletaService;
    }

    @GetMapping
    @Operation(summary = "Listar todas las boletas", description = "Permite a ADMIN y VENDEDOR visualizar el historial completo de órdenes")
    public List<Boleta> listarTodas() {
        return boletaRepository.findAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener detalle de una boleta por ID")
    public ResponseEntity<Boleta> obtenerPorId(@PathVariable Long id) {
        return boletaRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/usuario/{usuarioId}")
    @Operation(summary = "Listar boletas de un cliente específico")
    public List<Boleta> listarPorUsuario(@PathVariable Long usuarioId) {
        return boletaRepository.findByUsuarioId(usuarioId);
    }

    @PostMapping
    @Operation(summary = "Emitir nueva boleta", description = "Registra la compra, genera los detalles de boleta y descuenta el stock")
    public ResponseEntity<?> crear(@RequestBody BoletaRequest request) {
        try {
            Boleta creada = boletaService.generarBoleta(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(creada);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}