import Link from "next/link";
import type { Metadata } from "next";
import "./terminos.css";

export const metadata: Metadata = {
  title: "Términos y Condiciones · Mia Compra",
  description:
    "Términos y condiciones del servicio de envíos de Mia Compra · Latinship",
};

export default function TerminosPage() {
  return (
    <main className="terms-page">
      <header className="terms-header">
        <Link href="/" className="brand">
          <img
            src="/assets/logo-full.png"
            alt="Mia Compra · Tu felicidad, nuestro compromiso"
          />
        </Link>
        <Link href="/cotizador" className="back-link">
          ← Volver al cotizador
        </Link>
      </header>

      <article className="terms-wrap">
        <h1>Términos y Condiciones</h1>
        <p className="lead">
          Última actualización: junio de 2026. Al usar la plataforma Mia Compra
          (operada por Latinship), aceptas estos términos.
        </p>

        <h2>1. Introducción</h2>
        <p>
          Latinship es una empresa de tecnología B2B que conecta empresas de
          logística, mensajería y compras con sus clientes finales mediante una
          plataforma digital que permite cotizar envíos, generar etiquetas
          FedEx®, para la primera milla, procesar pagos, administrar órdenes y
          brindar soporte al cliente en todas las fases del envío.
        </p>
        <p>
          Latinship <strong>no es una empresa de envíos</strong>, no presta
          servicios logísticos directos, no recibe, almacena ni transporta
          mercancía, y no actúa como transportista, carrier, freight forwarder,
          consolidado, broker o almacén. Los servicios logísticos físicos son
          ejecutados exclusivamente por empresas aliadas independientes que
          operan de manera autónoma.
        </p>

        <h2>2. Definiciones Operativas</h2>
        <h3>2.1 Primera Milla (First Mile)</h3>
        <ul>
          <li>
            Transporte desde la dirección del cliente final en Estados Unidos
            hasta la bodega en Miami de una empresa logística aliada.
          </li>
          <li>
            Se realiza exclusivamente mediante FedEx®, utilizando la etiqueta
            generada en la plataforma de Latinship.
          </li>
          <li>Incluye automáticamente un seguro de USD $500.</li>
        </ul>

        <h3>2.2 Middle Mile (Envío Internacional)</h3>
        <ul>
          <li>Transporte desde Miami hacia el país destino.</li>
          <li>
            Esta fase es ejecutada enteramente por una empresa logística aliada
            independiente.
          </li>
        </ul>

        <h3>2.3 Última Milla (Last Mile)</h3>
        <ul>
          <li>
            Entrega final en el país destino realizada por operadores locales o
            aliados en dicho país.
          </li>
          <li>
            Latinship ofrece seguimiento y comunicación, pero no controla esta
            operación.
          </li>
        </ul>

        <h2>3. Rol de Latinship</h2>
        <p>Latinship provee:</p>
        <ul>
          <li>Plataforma digital de gestión de envíos</li>
          <li>Cotizador de tarifas</li>
          <li>Generación de etiquetas FedEx® primera milla</li>
          <li>Procesamiento de pagos</li>
          <li>Seguimiento y comunicación</li>
          <li>Soporte al cliente</li>
          <li>
            Integración entre el cliente final y la empresa logística asociada
          </li>
        </ul>
        <p>
          <strong>Latinship NO:</strong>
        </p>
        <ul>
          <li>Manipula paquetes</li>
          <li>Garantiza tiempos de entrega</li>
          <li>Declara mercancía en aduanas</li>
          <li>Controla empresas de transporte</li>
          <li>Asegura mercancía más allá de lo descrito</li>
        </ul>

        <h2>4. Seguro Incluido (USD $500 — Primera Milla)</h2>
        <p>
          Durante la primera milla (FedEx® → Miami), todo envío tiene una
          cobertura automática de USD $500. Latinship ayuda al cliente en el
          proceso de reclamo, pero:
        </p>
        <ul>
          <li>FedEx es el responsable directo</li>
          <li>Solo cubre hasta USD $500</li>
          <li>No cubre valores declarados superiores</li>
        </ul>

        <h2>5. Seguro Adicional Latinship (Opcional)</h2>
        <p>El cliente puede comprar seguro adicional otorgado por Latinship.</p>
        <p>
          <strong>Cubre:</strong>
        </p>
        <ul>
          <li>Pérdida total</li>
          <li>Pérdida parcial</li>
        </ul>
        <p>
          <strong>NO cubre:</strong>
        </p>
        <ul>
          <li>Daños</li>
          <li>Golpes</li>
          <li>Aplastamiento</li>
          <li>Roturas</li>
          <li>Deterioro</li>
        </ul>
        <p>
          <strong>Costo:</strong> 10% del valor declarado.
        </p>
        <p>
          <strong>Requisitos:</strong>
        </p>
        <ul>
          <li>Envío de facturas</li>
          <li>Declarar fragilidad</li>
          <li>Empaque adecuado</li>
        </ul>

        <h2>6. Empaque, Peso y Reglas de Seguridad</h2>
        <p>El cliente es responsable de:</p>
        <ul>
          <li>Empacar correctamente los artículos</li>
          <li>Declarar si el contenido es frágil</li>
          <li>Usar cinta alrededor de la caja (no solo arriba y abajo)</li>
          <li>No exceder 50 libras por caja</li>
          <li>Utilizar cajas en buen estado</li>
          <li>Mantener el peso declarado igual al peso real</li>
        </ul>
        <p className="terms-tip">
          <strong>Ejemplo recomendado:</strong> Es mejor enviar dos cajas
          medianas de 30 lb que una caja extra grande de 60 lb.
        </p>
        <p>
          <strong>Ajuste de tarifa por peso o dimensiones incorrectas.</strong>{" "}
          Si el peso o las dimensiones verificadas en Miami son mayores que lo
          declarado:
        </p>
        <ul>
          <li>Latinship ajustará el costo</li>
          <li>
            Se cobrará automáticamente la diferencia en la tarjeta utilizada
          </li>
        </ul>

        <h2>7. Responsabilidad por Fase del Envío</h2>
        <h3>Primera Milla → FedEx®</h3>
        <ul>
          <li>Responsable: FedEx</li>
          <li>Latinship: seguimiento y asistencia</li>
        </ul>

        <h3>Middle Mile → Empresa Logística Aliada</h3>
        <ul>
          <li>Transporte internacional</li>
          <li>Responsabilidad completa de la empresa aliada</li>
          <li>Latinship: seguimiento</li>
        </ul>

        <h3>Última Milla → Operador Local del País Destino</h3>
        <ul>
          <li>Entrega en el país destino</li>
          <li>Responsabilidad del operador local</li>
          <li>Latinship: seguimiento</li>
        </ul>

        <h2>8. Aduanas</h2>
        <ul>
          <li>
            Los impuestos, retenciones o inspecciones son responsabilidad del
            cliente.
          </li>
          <li>Latinship no realiza trámites aduanales.</li>
          <li>
            Si se requiere documentación adicional, Latinship comunicará al
            cliente.
          </li>
        </ul>

        <h2>9. Tiempos de Entrega</h2>
        <p>
          Todos los tiempos son estimados, no garantizados. Pueden verse
          afectados por:
        </p>
        <ul>
          <li>Aduanas</li>
          <li>Clima</li>
          <li>Operadores internacionales</li>
          <li>Falta de documentación</li>
          <li>Regulaciones del país destino</li>
        </ul>

        <h2>10. Reclamos</h2>
        <h3>10.1 Primera Milla</h3>
        <ul>
          <li>Reclamo con FedEx</li>
          <li>Latinship apoya al cliente en el proceso</li>
        </ul>
        <p className="terms-note">
          Esta sección continúa en revisión. Para reclamos relacionados con
          envíos, escríbenos por WhatsApp o correo al equipo de soporte de Mia
          Compra para asistencia inmediata.
        </p>

        <h2>Contacto</h2>
        <p>
          Dudas sobre estos términos:{" "}
          <a
            href="https://wa.me/17865502727"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp +1 (786) 550-2727
          </a>
          .
        </p>

        <div className="terms-footer-cta">
          <Link href="/cotizador" className="btn-back-cot">
            ← Volver al cotizador
          </Link>
        </div>
      </article>
    </main>
  );
}
