package cl.gaselvolcan.backend.service;

import cl.gaselvolcan.backend.dto.ApiDtos.BoletaRequest;
import cl.gaselvolcan.backend.dto.ApiDtos.ItemBoletaRequest;
import cl.gaselvolcan.backend.model.Boleta;
import cl.gaselvolcan.backend.model.DetalleBoleta;
import cl.gaselvolcan.backend.model.Producto;
import cl.gaselvolcan.backend.model.Usuario;
import cl.gaselvolcan.backend.repository.BoletaRepository;
import cl.gaselvolcan.backend.repository.ProductoRepository;
import cl.gaselvolcan.backend.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class BoletaService {

    private final BoletaRepository boletaRepository;
    private final UsuarioRepository usuarioRepository;
    private final ProductoRepository productoRepository;

    public BoletaService(
            BoletaRepository boletaRepository,
            UsuarioRepository usuarioRepository,
            ProductoRepository productoRepository
    ) {
        this.boletaRepository = boletaRepository;
        this.usuarioRepository = usuarioRepository;
        this.productoRepository = productoRepository;
    }

    @Transactional
    public Boleta generarBoleta(BoletaRequest request) {
        if (request.items() == null || request.items().isEmpty()) {
            throw new IllegalArgumentException("El carrito no puede estar vacío");
        }

        Usuario usuario = usuarioRepository.findById(request.usuarioId())
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        Boleta boleta = new Boleta();
        boleta.setFecha(LocalDateTime.now());
        boleta.setEstado("PAGADA");
        boleta.setUsuario(usuario);

        List<DetalleBoleta> detalles = new ArrayList<>();
        int totalBoleta = 0;

        for (ItemBoletaRequest item : request.items()) {
            Producto producto = productoRepository.findById(item.productoId())
                    .orElseThrow(() -> new IllegalArgumentException("Producto ID " + item.productoId() + " no existe"));

            if (item.cantidad() == null || item.cantidad() <= 0) {
                throw new IllegalArgumentException("La cantidad debe ser mayor a 0");
            }

            if (producto.getStock() < item.cantidad()) {
                throw new IllegalArgumentException("Stock insuficiente para: " + producto.getNombre());
            }

            // Descuento de stock en inventario
            producto.setStock(producto.getStock() - item.cantidad());
            productoRepository.save(producto);

            int subtotal = producto.getPrecio() * item.cantidad();
            totalBoleta += subtotal;

            DetalleBoleta detalle = new DetalleBoleta();
            detalle.setBoleta(boleta);
            detalle.setProducto(producto);
            detalle.setCantidad(item.cantidad());
            detalle.setPrecioUnitario(producto.getPrecio());
            detalle.setSubtotal(subtotal);
            detalles.add(detalle);
        }

        boleta.setTotal(totalBoleta);
        boleta.setDetalles(detalles);

        return boletaRepository.save(boleta);
    }
}