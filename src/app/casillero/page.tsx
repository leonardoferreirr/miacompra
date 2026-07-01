import Link from "next/link";
import type { Metadata } from "next";
import "./casillero.css";

export const metadata: Metadata = {
  title: "Procedimiento de Casillero · Mia Compra (uso interno)",
  description:
    "Guía operativa para crear el casillero de un cliente en Tracking Premium. Uso interno del equipo Mia Compra · Latinship.",
  robots: { index: false, follow: false },
};

export default function CasilleroPage() {
  return (
    <main className="cas-page">
      <header className="cas-header">
        <Link href="/" className="brand">
          <img
            src="/assets/logo-full.png"
            alt="Mia Compra · Tu felicidad, nuestro compromiso"
          />
        </Link>
        <span className="cas-tag">Uso interno · Equipo</span>
      </header>

      <article className="cas-wrap">
        <h1>Procedimiento de Casillero</h1>
        <p className="lead">
          Guía operativa para crear el casillero de un cliente en Tracking
          Premium. Sigue los pasos en orden, sin saltar la verificación ni la
          validación final.
        </p>

        <ol className="cas-steps">
          {/* 1 */}
          <li className="cas-step">
            <div className="cas-num">1</div>
            <div className="cas-body">
              <h2>Verificación de cliente existente</h2>
              <p>Antes de crear el casillero, buscar por:</p>
              <ul className="cas-list">
                <li>Nombre</li>
                <li>Correo electrónico</li>
                <li>Teléfono</li>
                <li>Documento de identidad</li>
              </ul>
              <div className="cas-callout cas-callout--warn">
                <strong>Si ya existe:</strong> no crear un nuevo registro.
                Actualiza únicamente la información necesaria.
              </div>
            </div>
          </li>

          {/* 2 */}
          <li className="cas-step">
            <div className="cas-num">2</div>
            <div className="cas-body">
              <h2>Recolección de datos</h2>
              <p>Solicitar la siguiente información.</p>
              <h3>Datos personales</h3>
              <ul className="cas-list cas-list--cols">
                <li>Nombre completo</li>
                <li>Apellido</li>
                <li>Correo electrónico</li>
                <li>Teléfono</li>
                <li>País</li>
                <li>Estado</li>
                <li>Ciudad</li>
                <li>Dirección completa</li>
                <li>Código Postal</li>
                <li>Documento de identidad</li>
              </ul>
              <h3>Tipo de cliente</h3>
              <div className="cas-chips">
                <span>Persona natural</span>
                <span>Empresa</span>
                <span>Agencia</span>
                <span>Personal Shopper</span>
              </div>
            </div>
          </li>

          {/* 3 */}
          <li className="cas-step">
            <div className="cas-num">3</div>
            <div className="cas-body">
              <h2>Confirmación de datos</h2>
              <p>Antes de guardar el registro, confirmar con el cliente:</p>
              <ul className="cas-list cas-list--cols">
                <li>Nombre correctamente escrito</li>
                <li>Correo sin errores</li>
                <li>Teléfono correcto</li>
                <li>Ciudad</li>
                <li>País</li>
              </ul>
            </div>
          </li>

          {/* 4 */}
          <li className="cas-step">
            <div className="cas-num">4</div>
            <div className="cas-body">
              <h2>Creación del cliente en Tracking Premium</h2>
              <p>Ingresar al módulo:</p>
              <p className="cas-path">
                Clientes <span>→</span> Nuevo Cliente
              </p>
              <p>Completar todos los campos obligatorios.</p>
            </div>
          </li>

          {/* 5 */}
          <li className="cas-step">
            <div className="cas-num">5</div>
            <div className="cas-body">
              <h2>Generación del código de casillero</h2>
              <p>El sistema generará automáticamente:</p>
              <ul className="cas-list">
                <li>Código de Cliente</li>
                <li>Suite Number</li>
                <li>Warehouse Number</li>
              </ul>
              <div className="cas-callout cas-callout--warn">
                <strong>Verificar</strong> que no exista duplicidad.
              </div>
            </div>
          </li>

          {/* 6 */}
          <li className="cas-step">
            <div className="cas-num">6</div>
            <div className="cas-body">
              <h2>Validación del casillero</h2>
              <p>Antes de finalizar, verificar:</p>
              <ul className="cas-check cas-list--cols">
                <li>Cliente activo</li>
                <li>Casillero asignado</li>
                <li>Correo registrado</li>
                <li>Teléfono registrado</li>
                <li>Dirección correcta</li>
                <li>País destino correcto</li>
              </ul>
            </div>
          </li>

          {/* 7 */}
          <li className="cas-step">
            <div className="cas-num">7</div>
            <div className="cas-body">
              <h2>Entrega de la dirección del almacén</h2>
              <p>Enviar al cliente la dirección oficial. Ejemplo:</p>
              <address className="cas-address">
                <span className="cas-address-co">LatinShip / Angels Export</span>
                <span>Nombre del Cliente</span>
                <span>
                  Suite <em>#####</em>
                </span>
                <span>Dirección del almacén</span>
                <span>Ciudad, Estado, ZIP</span>
                <span>Estados Unidos</span>
              </address>
              <div className="cas-callout cas-callout--key">
                <strong>Siempre</strong> indicar que el código de casillero debe
                aparecer en todas las etiquetas.
              </div>
            </div>
          </li>

          {/* 8 */}
          <li className="cas-step">
            <div className="cas-num">8</div>
            <div className="cas-body">
              <h2>Envío de credenciales</h2>
              <p>Enviar al cliente:</p>
              <ul className="cas-list cas-list--cols">
                <li>Usuario</li>
                <li>Contraseña temporal</li>
                <li>Código del casillero</li>
                <li>Enlace del sistema</li>
                <li>Aplicación móvil (si aplica)</li>
              </ul>
            </div>
          </li>

          {/* 9 */}
          <li className="cas-step">
            <div className="cas-num">9</div>
            <div className="cas-body">
              <h2>Envío del mensaje de bienvenida</h2>
              <p>Enviar automáticamente:</p>
              <ul className="cas-list cas-list--cols">
                <li>Bienvenida</li>
                <li>Código del casillero</li>
                <li>Usuario</li>
                <li>Contraseña</li>
                <li>Dirección</li>
                <li>Instrucciones básicas</li>
                <li>Contacto de soporte</li>
              </ul>
            </div>
          </li>
        </ol>

        <div className="cas-footer">
          <p>
            Dudas del procedimiento, escribe al equipo por{" "}
            <a
              href="https://wa.me/17865502727"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp +1 (786) 550-2727
            </a>
            .
          </p>
        </div>
      </article>
    </main>
  );
}
