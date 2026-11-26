package cl.gaselvolcan.backend.controller;

import cl.gaselvolcan.backend.dto.ApiDtos.ProductoRequest;
import cl.gaselvolcan.backend.model.Categoria;
import cl.gaselvolcan.backend.model.Producto;
import cl.gaselvolcan.backend.repository.CategoriaRepository;
import cl.gaselvolcan.backend.repository.ProductoRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/productos")
@Tag(name = "3. Productos", description = "CRUD de productos (lectura pública, creación/edición/eliminación solo ADMIN)")
public class ProductoController {

    private final ProductoRepository productoRepository;
    private final CategoriaRepository categoriaRepository;

    public ProductoController(ProductoRepository productoRepository, CategoriaRepository categoriaRepository) {
        this.productoRepository = productoRepository;
        this.categoriaRepository = categoriaRepository;
    }

    @GetMapping
    @Operation(summary = "Listar todos los productos")
    public List<Producto> listar() {
        return productoRepository.findAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener detalle de un producto por ID")
    public ResponseEntity<Producto> obtenerPorId(@PathVariable Long id) {
        return productoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Operation(summary = "Crear nuevo producto (Solo ADMIN)")
    public ResponseEntity<?> crear(@RequestBody ProductoRequest req) {
        Categoria categoria = resolverCategoria(req);
        if (categoria == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Categoría inválida o no encontrada"));
        }

        Producto p = new Producto();
        p.setNombre(req.nombre());
        p.setDescripcion(req.descripcion());
        p.setPrecio(req.precio());
        p.setStock(req.stock());
        p.setImagen(req.imagen());
        p.setCategoria(categoria);

        return ResponseEntity.status(HttpStatus.CREATED).body(productoRepository.save(p));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar producto existente (Solo ADMIN)")
    public ResponseEntity<?> actualizar(@PathVariable Long id, @RequestBody ProductoRequest req) {
        return productoRepository.findById(id)
                .<ResponseEntity<?>>map(p -> {
                    Categoria categoria = resolverCategoria(req);
                    if (categoria != null) {
                        p.setCategoria(categoria);
                    }
                    p.setNombre(req.nombre());
                    p.setDescripcion(req.descripcion());
                    p.setPrecio(req.precio());
                    p.setStock(req.stock());
                    p.setImagen(req.imagen());
                    return ResponseEntity.ok(productoRepository.save(p));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar producto (Solo ADMIN)")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (!productoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        productoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private Categoria resolverCategoria(ProductoRequest req) {
        if (req.categoriaId() != null) {
            return categoriaRepository.findById(req.categoriaId()).orElse(null);
        }
        if (req.categoriaNombre() != null && !req.categoriaNombre().isBlank()) {
            return categoriaRepository.findByNombre(req.categoriaNombre()).orElse(null);
        }
        return null;
    }
}