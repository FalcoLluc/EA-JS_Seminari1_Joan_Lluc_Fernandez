let user, posts, comments;

// Pedir los datos JSON de un usuario
//FUNCIO FLECHA
const getUsuario = (userId) => {
    return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(response => {
        if (!response.ok) throw new Error("Error al obtener el usuario");
        return response.json();
    });
}


// Pedir los posts de ese mismo usuario
const getPosts = (userId) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then(response => {
            if (!response.ok) throw new Error("Error al obtener los posts");
            return response.json();
        });
};

// Pedir los comentarios de los posts
const getComments = (postId) => {
    return fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
        .then(response => {
            if (!response.ok) throw new Error("Error al obtener comentarios del post");
            return response.json();
        });
};


async function getAllComments(posts) {
    try {
        const commentsTotal = posts.map(post => getComments(post.id));
        const commentsArrays = await Promise.all(commentsTotal);
        return commentsArrays.flat();
    } catch (error) {
        console.error("Error:", error);
    }
}

// Usar 3 de las funciones de alto nivel combinadas (map, reduce, filte,...) con los datos. 
getUsuario(2)
  .then(usuario => {
    user=usuario;
    return getPosts(usuario.id);
  })
  .then(publis => {
    posts = publis;
    return getAllComments(publis);
  })
  .then(allComments => {
    console.log(`Se han obtenido ${allComments.length} comentarios en total:`);
    allComments.forEach(comment => {
      //console.log(comment);
    });
    console.log(`El usuario: ${user.name} tiene ${posts.length} posts`);
  })


async function fetchDatos(longitud) {
    try {
        const user = await getUsuario(2);
        const posts = await getPosts(user.id);
        const comments = await getComments(posts[0].id);
        console.log(`Comentarios en este post: ${comments.length}`);

        const conmentariosCortosSumaLetras=comments
            .filter(comment => comment.body.length < longitud)
            .map(comment => comment.body.length)
            .reduce((a,b) => a+b, 0);
        console.log(`Suma letras: ${conmentariosCortosSumaLetras}`);
    } catch (error) {
        console.error("Error:", error);
    }
}

//fetchDatos(50);
fetchDatos(170);
//fetchDatos(170);