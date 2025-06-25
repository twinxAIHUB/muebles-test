"use client"

export function initCustomCursor() {
  // Crear elementos del cursor
  const cursor = document.createElement("div")
  cursor.classList.add("custom-cursor")

  const cursorInner = document.createElement("div")
  cursorInner.classList.add("custom-cursor-inner")

  const cursorOuter = document.createElement("div")
  cursorOuter.classList.add("custom-cursor-outer")

  const cursorTool = document.createElement("div")
  cursorTool.classList.add("custom-cursor-tool")

  // Añadir elementos al DOM
  cursor.appendChild(cursorInner)
  cursor.appendChild(cursorOuter)
  cursor.appendChild(cursorTool)
  document.body.appendChild(cursor)

  // Variables para animación suave
  let mouseX = 0
  let mouseY = 0
  let cursorX = 0
  let cursorY = 0
  let prevMouseX = 0
  let prevMouseY = 0
  let mouseSpeed = 0
  const trailElements = []
  const maxTrailElements = 5
  let lastTrailTime = 0
  const trailInterval = 50 // ms entre elementos de rastro

  // Seguir el cursor con efecto suave
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY

    // Calcular velocidad del movimiento
    const dx = mouseX - prevMouseX
    const dy = mouseY - prevMouseY
    mouseSpeed = Math.sqrt(dx * dx + dy * dy)

    // Actualizar posiciones previas
    prevMouseX = mouseX
    prevMouseY = mouseY

    // Efecto de deformación basado en la velocidad
    if (mouseSpeed > 10) {
      cursor.classList.add("moving-fast")
    } else {
      cursor.classList.remove("moving-fast")
    }

    // Crear elementos de rastro
    const now = Date.now()
    if (now - lastTrailTime > trailInterval && mouseSpeed > 5) {
      createTrailElement(mouseX, mouseY)
      lastTrailTime = now
    }
  })

  // Función para crear elementos de rastro
  function createTrailElement(x, y) {
    const trail = document.createElement("div")
    trail.classList.add("cursor-trail")
    trail.style.left = `${x}px`
    trail.style.top = `${y}px`
    document.body.appendChild(trail)

    // Animación de desvanecimiento
    setTimeout(() => {
      trail.style.animation = "fadeOut 0.5s forwards"
    }, 100)

    // Eliminar después de la animación
    setTimeout(() => {
      if (trail.parentNode) {
        document.body.removeChild(trail)
      }
    }, 600)

    // Gestionar array de elementos de rastro
    trailElements.push(trail)
    if (trailElements.length > maxTrailElements) {
      const oldTrail = trailElements.shift()
      if (oldTrail && oldTrail.parentNode) {
        document.body.removeChild(oldTrail)
      }
    }
  }

  // Función de animación para movimiento suave
  function animateCursor() {
    // Interpolación para movimiento suave
    const easeFactor = 0.15
    cursorX += (mouseX - cursorX) * easeFactor
    cursorY += (mouseY - cursorY) * easeFactor

    // Aplicar posición
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`

    // Continuar animación
    requestAnimationFrame(animateCursor)
  }

  // Iniciar animación
  animateCursor()

  // Efecto de magnetismo para elementos interactivos
  const interactiveElements = document.querySelectorAll(
    'a, button, input, textarea, select, [role="button"], .clickable',
  )

  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("hover")
    })

    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("hover")
    })

    // Efecto de magnetismo
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Calcular distancia al centro del elemento
      const distX = e.clientX - centerX
      const distY = e.clientY - centerY
      const distance = Math.sqrt(distX * distX + distY * distY)

      // Si está lo suficientemente cerca, aplicar efecto magnético
      if (distance < rect.width / 1.5) {
        const magnetStrength = 0.4
        const magnetX = centerX + distX * magnetStrength
        const magnetY = centerY + distY * magnetStrength

        // Aplicar efecto magnético directamente al cursor
        cursor.style.transform = `translate(${magnetX}px, ${magnetY}px)`
      }
    })
  })

  // Efecto de clic
  document.addEventListener("mousedown", () => {
    cursor.classList.add("clicking")
  })

  document.addEventListener("mouseup", () => {
    cursor.classList.remove("clicking")
  })

  // Ocultar cuando el cursor sale de la ventana
  document.addEventListener("mouseout", (e) => {
    if (e.relatedTarget === null) {
      cursor.style.opacity = "0"
    }
  })

  document.addEventListener("mouseover", () => {
    cursor.style.opacity = "1"
  })

  // Añadir clase especial para elementos de diseño
  const designElements = document.querySelectorAll(".design-element, img, .card")

  designElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("design-mode")
    })

    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("design-mode")
    })
  })
}
