// In-memory user store for the MVP
let usuarios = []

export function registrarUsuario(datos) {
  const errores = validarRegistro(datos)
  if (errores.length > 0) return { ok: false, errores }
  
  const existe = usuarios.find((u) => u.email === datos.email.trim().toLowerCase())
  if (existe) return { ok: false, errores: ['Este correo ya está registrado.'] }

  const nuevoUsuario = {
    id: Date.now(),
    nombre: datos.nombre.trim(),
    email: datos.email.trim().toLowerCase(),
    telefono: datos.telefono.trim(),
    password: datos.password,
    tipo: datos.tipo, // 'vecino' | 'emprendedor'
    creadoEn: new Date().toISOString(),
  }
  usuarios.push(nuevoUsuario)
  return { ok: true, usuario: nuevoUsuario }
}

export function loginUsuario(email, password) {
  const usuario = usuarios.find(
    (u) => u.email === email.trim().toLowerCase() && u.password === password
  )
  if (!usuario) return { ok: false, error: 'Correo o contraseña incorrectos.' }
  return { ok: true, usuario }
}

export function validarRegistro(datos) {
  const errores = []
  if (!datos.nombre || datos.nombre.trim().length < 2)
    errores.push('El nombre debe tener al menos 2 caracteres.')
  if (!datos.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email))
    errores.push('Ingresa un correo electrónico válido.')
  if (!datos.telefono || datos.telefono.trim().length < 7)
    errores.push('El teléfono debe tener al menos 7 dígitos.')
  if (!datos.password || datos.password.length < 6)
    errores.push('La contraseña debe tener al menos 6 caracteres.')
  if (!datos.tipo) errores.push('Selecciona el tipo de cuenta.')
  return errores
}

export function getUsuarios() {
  return usuarios
}

export function resetUsuarios() {
  usuarios = []
}
