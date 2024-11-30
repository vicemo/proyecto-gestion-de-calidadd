const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const path = require('path')
const { escape } = require('querystring')

const app = express()

app.use(express.static(path.join(__dirname, "public")))
app.use(cors())
app.use(express.json())

const port = 5000

const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password:"",
    database:"gestion_calidad"

})

//esta parte es para los usuarios
app.post('/add_user', (req, res) => {
    const sql = "INSERT INTO usuarios (`nombre`, `correo`, `clave`, `rol`) VALUES (?, ?, ?, ?)";
    const values = [
        req.body.nombre,
        req.body.correo,
        req.body.clave,
        req.body.rol
    ];
    
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ message: 'Algo ha ocurrido mal: ' + err });
        }
        return res.status(200).json({ success: "Usuario agregado exitosamente!" });
    });
});


app.get("/usuarios", (req, res) => {
    const sql = "SELECT * FROM usuarios";
    db.query(sql, (err, result) => {
      if (err) res.json({ message: "Server error" });
      return res.json(result);
    });
  });

app.get("/get_usuarios/:id_usuario", (req, res) => {
    const id_usuario = req.params.id_usuario;
    const sql = "SELECT * FROM usuarios WHERE `id_usuario`= ?";
    db.query(sql, [id_usuario], (err, result) => {
      if (err) res.json({ message: "Server error" });
      return res.json(result);
    });
  });
  app.post("/edit_user/:id_usuario", (req, res) => {
    const id_usuario = req.params.id_usuario;
    const sql =
      "UPDATE usuarios SET `nombre`=?, `correo`=?, `clave`=?, `rol`=? WHERE `id_usuario`=?";
    const values = [
      req.body.nombre,
      req.body.correo,
      req.body.clave,
      req.body.rol,
      id_usuario
    ];
    db.query(sql, values, (err, result) => {
      if (err)
        return res.json({ message: "Something unexpected has occured" + err });
      return res.json({ success: "Student updated successfully" });
    });
  });
  
app.delete("/delete/:id_usuario", (req, res) => {
    const id_usuario = req.params.id_usuario;
    const sql = "DELETE FROM usuarios WHERE id_usuario=?";
    const values = [id_usuario];
    db.query(sql, values, (err, result) => {
      if (err)
        return res.json({ message: "Something unexpected has occured" + err });
      return res.json({ success: "Student updated successfully" });
    });
  });
  // termina la parte para los usuarios
  // comienza la parte para el crud de proyectos


app.post('/add_proyecto', (req, res) => {
  const { nombre, descripcion, fecha_inicio, fecha_fin, estado, id_usuario } = req.body;

  // Verificar si el id_usuario es válido
  const checkUserSql = "SELECT * FROM usuarios WHERE id_usuario = ?";
  db.query(checkUserSql, [id_usuario], (err, userResult) => {
      if (err) {
          console.error('Error al verificar usuario:', err);
          return res.status(500).json({ message: 'Error al verificar usuario: ' + err });
      }
      if (userResult.length === 0) {
          return res.status(400).json({ message: 'El usuario no existe' });
      }

      // Si el usuario existe, insertar el proyecto
      const sql = "INSERT INTO proyectos (`nombre`, `descripcion`, `fecha_inicio`, `fecha_fin`, `estado`, `id_usuario`) VALUES (?, ?, ?, ?, ?, ?)";
      const values = [nombre, descripcion, fecha_inicio, fecha_fin, estado, id_usuario];
      
      db.query(sql, values, (err, result) => {
          if (err) {
              console.error('Error en la consulta:', err);
              return res.status(500).json({ message: 'Algo ha ocurrido mal: ' + err });
          }
          return res.status(200).json({ success: "Proyecto agregado exitosamente!" });
      });
  });
});
//eliminar proyectos 
app.delete("/delete_proyecto/:id_proyecto", (req, res) => {
  const id_proyecto = req.params.id_proyecto;
  const sql = "DELETE FROM proyectos WHERE id_proyecto=?";
  const values = [id_proyecto];

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.json({ message: "Something unexpected has occurred: " + err });
    }
    if (result.affectedRows === 0) {
      return res.json({ message: "No project found with the given ID" });
    }
    return res.json({ success: "Project deleted successfully" });
  });
});
//listar proyectos
app.get('/proyectos', (req, res) => {
  const sql = `SELECT 
          proyectos.id_proyecto,
          proyectos.nombre AS proyecto_nombre,
          proyectos.descripcion,
          proyectos.fecha_inicio,
          proyectos.fecha_fin,
          proyectos.estado,
          proyectos.id_usuario,
          usuarios.nombre AS usuario_nombre
      FROM proyectos
      INNER JOIN usuarios ON proyectos.id_usuario = usuarios.id_usuario`;
  
  db.query(sql, (err, result) => {
      if (err) {
          console.error('Error en la consulta:', err);
          return res.status(500).json({ message: 'Algo ha ocurrido mal: ' + err });
      }
      return res.status(200).json(result); // Enviar los resultados con el nombre del usuario
  });
});

//actualizar proyecto
// Actualizar proyecto
// Backend: Asegúrate de que esta ruta exista en tu servidor.
app.post("/edit_proyecto/:id_proyecto", (req, res) => {
  const id_proyecto = req.params.id_proyecto;
  const sql = "UPDATE proyectos SET `nombre`=?, `descripcion`=?, `fecha_inicio`=?, `fecha_fin`=?, `estado`=?, `id_usuario`=? WHERE `id_proyecto`=?";
  const values = [
      req.body.nombre,
      req.body.descripcion,
      req.body.fecha_inicio,
      req.body.fecha_fin,
      req.body.estado,
      req.body.id_usuario,
      id_proyecto
  ];

  db.query(sql, values, (err, result) => {
      if (err) {
          console.error('Error en la consulta:', err);
          return res.status(500).json({ message: 'Algo ha ocurrido mal: ' + err });
      }
      return res.status(200).json({ success: "Proyecto actualizado exitosamente!" });
  });
});


/// leer datos del proyecto 
app.get("/get_proyecto/:id_proyecto", (req, res) => {
  const id_proyecto = req.params.id_proyecto;
  const sql = "SELECT * FROM proyectos WHERE `id_proyecto`= ?";
  db.query(sql, [id_proyecto], (err, result) => {
      if (err) return res.json({ message: "Server error" });
      return res.json(result);
  });
});

//---------------------------------------------------------------------------------
//casos pruebas


app.post('/add_casos', (req, res) => {
  const { id_proyecto, nombre, descripcion, resultado, evidencia } = req.body;

  // Verificar si el id_proyecto es válido
  const checkUserSql = "SELECT * FROM proyectos WHERE id_proyecto= ?";
  db.query(checkUserSql, [id_proyecto], (err, userResult) => {
      if (err) {
          console.error('Error al verificar proyecto:', err);
          return res.status(500).json({ message: 'Error al verificar proyecto: ' + err });
      }
      if (userResult.length === 0) {
          return res.status(400).json({ message: 'El proyecto no existe' });
      }

      // Si el proyecto existe, insertar el caso
      const sql = "INSERT INTO casos_pruebas (`id_proyecto`,`nombre`, `descripcion`,  `resultado`, `evidencia`) VALUES (?, ?, ?, ?, ?)";
      const values = [id_proyecto, nombre, descripcion, resultado, evidencia];
      
      db.query(sql, values, (err, result) => {
          if (err) {
              console.error('Error en la consulta:', err);
              return res.status(500).json({ message: 'Algo ha ocurrido mal: ' + err });
          }
          return res.status(200).json({ success: "caso agregado exitosamente!" });
      });
  });
});
//eliminar casos
app.delete("/delete_casos/:id_caso", (req, res) => {
  const id_caso = req.params.id_caso;
  const sql = "DELETE FROM casos_pruebas WHERE id_caso=?";
  const values = [id_caso];

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.json({ message: "Something unexpected has occurred: " + err });
    }
    if (result.affectedRows === 0) {
      return res.json({ message: "No project found with the given ID" });
    }
    return res.json({ success: "caso deleted successfully" });
  });
});

//listar casos

// Listar casos de prueba
app.get('/casos', (req, res) => {
  const sql = `
      SELECT 
          casos_pruebas.id_caso,
          casos_pruebas.nombre AS casos_nombre,
          casos_pruebas.descripcion,
          casos_pruebas.resultado,
          casos_pruebas.evidencia,
          casos_pruebas.id_proyecto,
          proyectos.nombre AS proyecto_nombre
      FROM casos_pruebas
      INNER JOIN proyectos ON casos_pruebas.id_proyecto = proyectos.id_proyecto
  `;
  
  db.query(sql, (err, result) => {
      if (err) {
          console.error('Error en la consulta:', err);
          return res.status(500).json({ message: 'Algo ha ocurrido mal: ' + err });
      }
      return res.status(200).json(result); 
  });
});


// Editar caso
app.post("/edit_casos/:id_caso", (req, res) => {
  const id_caso = req.params.id_caso; // Corregido
  const { nombre, descripcion, evidencia, resultado, id_proyecto } = req.body;

  const sql =
      "UPDATE casos_pruebas SET `nombre`=?, `descripcion`=?, `evidencia`=?, `resultado`=?, `id_proyecto`=? WHERE `id_caso`=?";
  const values = [nombre, descripcion, evidencia, resultado, id_proyecto, id_caso];

  db.query(sql, values, (err, result) => {
      if (err) {
          console.error("Error en la consulta:", err);
          return res.status(500).json({ message: "Algo ha ocurrido mal: " + err });
      }
      return res.status(200).json({ success: "Caso actualizado exitosamente!" });
  });
});

// Obtener un caso por ID
app.get("/get_casos/:id_caso", (req, res) => {
  const id_caso = req.params.id_caso; // Corregido
  const sql = "SELECT * FROM casos_pruebas WHERE `id_caso` = ?";
  db.query(sql, [id_caso], (err, result) => {
      if (err) {
          console.error("Error en la consulta:", err);
          return res.status(500).json({ message: "Algo ha ocurrido mal: " + err });
      }
      return res.status(200).json(result);
  });
});

///-------
//defectos
app.post('/add_defecto', (req, res) => {
  const { id_caso, descripcion, severidad, fecha_creacion, estado, id_usuario } = req.body;
  const query = `
      INSERT INTO defectos (id_caso, descripcion, severidad, fecha_creacion, estado, id_usuario)
      VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [id_caso, descripcion, severidad, fecha_creacion, estado, id_usuario], (err, result) => {
      if (err) {
          console.error('Error al agregar defecto:', err);
          res.status(500).send(err);
      } else {
          res.json({ message: 'Defecto agregado exitosamente', id: result.insertId });
      }
  });
});
//eliminar defectos
app.delete("/delete_defecto/:id_defecto", (req, res) => {
  const id_defecto = req.params.id_defecto;
  const sql = "DELETE FROM defectos WHERE id_defecto=?";
  const values = [id_defecto];

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.json({ message: "Something unexpected has occurred: " + err });
    }
    if (result.affectedRows === 0) {
      return res.json({ message: "No project found with the given ID" });
    }
    return res.json({ success: "caso deleted successfully" });
  });
});



// Listar defectos de prueba
app.get('/defectos', (req, res) => {
  const sql = `
select 
defectos.id_defecto, 
casos_pruebas.nombre as casos_nombre, 
defectos.descripcion,
 defectos.severidad, 
defectos.estado, 
defectos.fecha_creacion, 
usuarios.nombre as Nombre_usuario 
from defectos 
inner join casos_pruebas on defectos.id_caso=casos_pruebas.id_caso 
inner join usuarios on defectos.id_usuario=usuarios.id_usuario;
  `;
  
  db.query(sql, (err, result) => {
      if (err) {
          console.error('Error en la consulta:', err);
          return res.status(500).json({ message: 'Algo ha ocurrido mal: ' + err });
      }
      return res.status(200).json(result); 
  });
});


// Editar defecto
app.post("/edit_defecto/:id_defecto", (req, res) => {
  const id_defecto = req.params.id_defecto; // Corregido
  const { id_caso, descripcion, severidad, estado, fecha_creacion, id_usuario} = req.body;

  const sql =
      "UPDATE defectos SET `id_caso`=?, `descripcion`=?, `severidad`=?, `estado`=?, `fecha_creacion`=?,`id_usuario`=? WHERE `id_defecto`=?";
  const values = [id_caso, descripcion, severidad, estado, fecha_creacion, id_usuario,id_defecto];

  db.query(sql, values, (err, result) => {
      if (err) {
          console.error("Error en la consulta:", err);
          return res.status(500).json({ message: "Algo ha ocurrido mal: " + err });
      }
      return res.status(200).json({ success: "Caso actualizado exitosamente!" });
  });
});

// Obtener un un defecto por el id
app.get("/get_defecto/:id_defecto", (req, res) => {
  const id_defecto = req.params.id_defecto; // Corregido
  const sql = "SELECT * FROM casos_pruebas WHERE `id_caso` = ?";
  db.query(sql, [id_defecto], (err, result) => {
      if (err) {
          console.error("Error en la consulta:", err);
          return res.status(500).json({ message: "Algo ha ocurrido mal: " + err });
      }
      return res.status(200).json(result);
  });
});



// Ruta para login de usuario
app.post('/login', (req, res) => {
  const { correo, clave } = req.body;

  if (!correo || !clave) {
      return res.status(400).json({ message: "Correo y clave son requeridos" });
  }

  const sql = "SELECT * FROM usuarios WHERE correo = ? AND clave = ?";
  db.query(sql, [correo, clave], (err, result) => {
      if (err) {
          console.error('Error en la consulta:', err);
          return res.status(500).json({ message: 'Algo ha ocurrido mal' });
      }

      if (result.length === 0) {
          return res.status(401).json({ message: "Credenciales inválidas" });
      }

      return res.status(200).json({ 
          message: "Inicio de sesión exitoso", 
          user: {
              id_usuario: result[0].id_usuario,
              nombre: result[0].nombre,
              correo: result[0].correo,
              rol: result[0].rol
          }
      });
  });
});

/*app.listen(port, () => {
  console.log(`Servidor ejecutándose en el puerto ${port}`);
});*/

app.listen(port,()=>{
    console.log('listening')
})