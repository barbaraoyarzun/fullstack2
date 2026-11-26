import camionesImg from '../assets/camiones-chillan.jpg';

function Nosotros() {
  return (
    <main className="contenedor-principal">
      <h2>Sobre Gas El Volcán</h2>

      {/* Introducción e Historia */}
      <section className="seccion-nosotros">
        <p className="texto-destacado">
          <strong>Distribuidora de Gas "El Volcán"</strong> es una empresa chilena nacida en la Región de Ñuble, 
          dedicada a la comercialización y distribución de gas licuado de petróleo (GLP) residencial e industrial, 
          además de accesorios y equipamiento normado.
        </p>
        <p>
          Desde nuestros inicios en Chillán, nos hemos caracterizado por ofrecer un servicio cercano, rápido y enfocado 
          en la seguridad de cada uno de nuestros clientes. Contamos con una flota propia de vehículos preparados para 
          atender pedidos con tiempos de respuesta mínimos.
        </p>
      </section>

      {/* Imagen Corporativa */}
      <div className="nosotros-imagen-container">
        <img 
          src={camionesImg} 
          alt="Flota de distribución Gas El Volcán en Chillán" 
          className="nosotros-img"
        />
      </div>

      {/* Misión y Visión */}
      <div className="grilla-nosotros">
        <div className="tarjeta-nosotros">
          <h3>Nuestra Misión</h3>
          <p>
            Garantizar el abastecimiento continuo y seguro de energía limpia para los hogares y comercios de la Región de Ñuble, 
            brindando una atención al cliente caracterizada por la puntualidad, la transparencia en los precios y el estricto 
            cumplimiento de la normativa de seguridad vigente.
          </p>
        </div>

        <div className="tarjeta-nosotros">
          <h3>Nuestra Visión</h3>
          <p>
            Consolidarnos como la distribuidora de gas independiente líder en la Región de Ñuble, reconocida por la modernización 
            de sus procesos de atención digital y la excelencia operativa en el reparto a domicilio.
          </p>
        </div>
      </div>

      {/* Valores Corporativos */}
      <section className="seccion-nosotros" style={{ marginTop: '25px' }}>
        <h3>Nuestros Valores</h3>
        <ul className="lista-valores">
          <li><strong>Seguridad:</strong> Inspección periódica de nuestros cilindros, válvulas y equipamiento de reparto.</li>
          <li><strong>Puntualidad:</strong> Compromiso firme con los horarios de entrega acordados con cada cliente.</li>
          <li><strong>Transparencia:</strong> Precios claros y justos en cada carga, sin cobros ocultos ni sorpresas.</li>
          <li><strong>Cercanía:</strong> Atención personalizada y atenta a través de todos nuestros canales de contacto.</li>
        </ul>
      </section>

      {/* Cobertura de Distribución */}
      <section className="seccion-nosotros" style={{ marginTop: '25px' }}>
        <h3>Zonas de Cobertura</h3>
        <p>
          Realizamos despacho a domicilio con flota dedicada en las siguientes comunas:
        </p>
        <div className="etiquetas-cobertura">
          <span className="badge-cobertura">Chillán</span>
          <span className="badge-cobertura">Chillán Viejo</span>
          <span className="badge-cobertura">El Carmen</span>
          <span className="badge-cobertura">Pinto</span>
          <span className="badge-cobertura">San Ignacio</span>
          <span className="badge-cobertura">Bulnes</span>
          <span className="badge-cobertura">Quillón</span>
        </div>
      </section>
    </main>
  );
}

export default Nosotros;