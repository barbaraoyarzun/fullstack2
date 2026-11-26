package cl.gaselvolcan.backend.config;

import cl.gaselvolcan.backend.model.Categoria;
import cl.gaselvolcan.backend.model.Producto;
import cl.gaselvolcan.backend.model.Usuario;
import cl.gaselvolcan.backend.repository.CategoriaRepository;
import cl.gaselvolcan.backend.repository.ProductoRepository;
import cl.gaselvolcan.backend.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final CategoriaRepository categoriaRepository;
    private final ProductoRepository productoRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(
            UsuarioRepository usuarioRepository,
            CategoriaRepository categoriaRepository,
            ProductoRepository productoRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.usuarioRepository = usuarioRepository;
        this.categoriaRepository = categoriaRepository;
        this.productoRepository = productoRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (usuarioRepository.count() == 0) {
            Usuario admin = new Usuario();
            admin.setRun("11.111.111-1");
            admin.setNombre("Administrador Volcán");
            admin.setCorreo("admin@gaselvolcan.cl");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRol("ADMIN");

            Usuario vendedor = new Usuario();
            vendedor.setRun("33.333.333-3");
            vendedor.setNombre("Vendedor Volcán");
            vendedor.setCorreo("vendedor@gaselvolcan.cl");
            vendedor.setPassword(passwordEncoder.encode("vendedor123"));
            vendedor.setRol("VENDEDOR");

            Usuario cliente = new Usuario();
            cliente.setRun("22.222.222-2");
            cliente.setNombre("Cliente Prueba");
            cliente.setCorreo("cliente@gmail.com");
            cliente.setPassword(passwordEncoder.encode("123456"));
            cliente.setRol("CLIENTE");

            usuarioRepository.saveAll(List.of(admin, vendedor, cliente));
        }

        if (categoriaRepository.count() == 0 && productoRepository.count() == 0) {
            Categoria catCilindros = categoriaRepository.save(
                    new Categoria("Cilindros", "Cilindros de Gas Licuado de Petróleo (GLP) certificados")
            );
            Categoria catAccesorios = categoriaRepository.save(
                    new Categoria("Accesorios", "Reguladores, mangueras, kits y seguridad para instalaciones de gas")
            );

            productoRepository.saveAll(List.of(
                    crearProducto("Cilindro GLP 5 kg", "Cilindro portátil ideal para camping, estufas pequeñas y parrillas.", 8500, 35, catCilindros, "cilindro-5kg.jpg"),
                    crearProducto("Cilindro GLP 11 kg", "Cilindro doméstico estándar de 11 kg para cocina y calefón.", 14500, 50, catCilindros, "cilindro-11kg.jpg"),
                    crearProducto("Cilindro GLP 15 kg", "Cilindro de mayor autonomía para uso residencial continuo.", 19500, 40, catCilindros, "cilindro-15kg.jpg"),
                    crearProducto("Cilindro GLP 45 kg", "Cilindro industrial y comercial de alta capacidad.", 56000, 20, catCilindros, "cilindro-45kg.jpg"),
                    crearProducto("Regulador de Alta Presión", "Regulador certificado para equipos industriales y quemadores.", 12900, 25, catAccesorios, "regulador-de-alta-presion.jpg"),
                    crearProducto("Regulador Dual", "Regulador doble vía para conectar dos cilindros simultáneamente.", 18900, 15, catAccesorios, "regulador-dual.jpg"),
                    crearProducto("Manguera de Gas Certificada", "Manguera flexible reforzada para conexión doméstica segura.", 5500, 60, catAccesorios, "manguera-gas.jpg"),
                    crearProducto("Manguera de Gas 3 Metros", "Manguera certificada de 3 metros de largo con abrazaderas.", 8900, 30, catAccesorios, "manguera-gas-3m.jpg"),
                    crearProducto("Kit de Conexión Completo", "Incluye regulador certificado, manguera y abrazaderas listas para instalar.", 14900, 28, catAccesorios, "kit-conexion.jpg"),
                    crearProducto("Detector de Fugas de Gas", "Sensor digital con alarma sonora para detección temprana de GLP.", 24900, 18, catAccesorios, "detector-gas.jpg"),
                    crearProducto("Carro Transportador de Gas", "Carro metálico reforzado para trasladar cilindros de 11 y 15 kg.", 22500, 12, catAccesorios, "carro-gas.jpg"),
                    crearProducto("Tapa Protectora de Cilindro", "Cubierta resistente a la intemperie para cilindros exteriores.", 6900, 40, catAccesorios, "tapa-gas.jpg")
            ));
        }
    }

    private Producto crearProducto(String nombre, String desc, int precio, int stock, Categoria cat, String img) {
        Producto p = new Producto();
        p.setNombre(nombre);
        p.setDescripcion(desc);
        p.setPrecio(precio);
        p.setStock(stock);
        p.setCategoria(cat);
        p.setImagen(img);
        return p;
    }
}