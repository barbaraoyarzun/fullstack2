package cl.gaselvolcan.backend.dto;

import java.util.List;

public class ApiDtos {

    public record LoginRequest(String correo, String password) {}

    public record RegistroRequest(String run, String nombre, String correo, String password) {}

    public record AuthResponse(
            String token,
            Long id,
            String run,
            String nombre,
            String correo,
            String rol
    ) {}

    public record ProductoRequest(
            String nombre,
            String descripcion,
            Integer precio,
            Integer stock,
            String imagen,
            Long categoriaId,
            String categoriaNombre
    ) {}

    public record ItemBoletaRequest(Long productoId, Integer cantidad) {}

    public record BoletaRequest(Long usuarioId, List<ItemBoletaRequest> items) {}
}