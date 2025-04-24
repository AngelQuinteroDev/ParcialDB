import { createRandomPosts } from './modules/firestore_service.js';

import { getPopularAcademicPosts } from './modules/firestore_service.js';

import { getTopUsersByPopularPosts } from './modules/firestore_service.js';


document.getElementById("crearPostsBtn").addEventListener("click", async () => {
  const comunidad = document.getElementById("communityId").value;
  const usuario = document.getElementById("userId").value;

  if (!comunidad || !usuario) {
    alert("Llena todos los campos");
    return;
  }

  await createRandomPosts(comunidad, usuario);
});



document.getElementById("btnAcademicPosts").addEventListener("click", async () => {
    const result = await getPopularAcademicPosts();
  
    const container = document.getElementById("academicPostList");
    container.innerHTML = "";
  
    if (result.length === 0) {
      container.innerHTML = "<p>No hay posts académicos con más de 50 likes.</p>";
      return;
    }
  
    result.forEach(post => {
      const div = document.createElement("div");
      div.className = "post-card";
      div.innerHTML = `
        <p><strong>Tipo:</strong> ${post.type}</p>
        <p><strong>Likes:</strong> ${post.likes}</p>
        <p><strong>Publicado:</strong> ${post.publishedAt.toDate().toLocaleString()}</p>
      `;
      container.appendChild(div);
    });
  });



  document.getElementById("verTopUsuariosBtn").addEventListener("click", async () => {
    const comunidad = document.getElementById("communityIdTop").value;
    if (!comunidad) {
      alert("Falta el ID de la comunidad");
      return;
    }
  
    const topUsers = await getTopUsersByPopularPosts(comunidad);
    const result = document.getElementById("topUsersList");
  
    result.innerHTML = topUsers.length === 0
      ? "<p>No se encontraron usuarios con posts > 100 likes.</p>"
      : topUsers.map(u => `<p><strong>${u.userId}</strong>: ${u.count} posts</p>`).join('');

      
  });