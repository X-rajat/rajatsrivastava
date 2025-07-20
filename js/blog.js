document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("blog-form");
  const postsDiv = document.getElementById("blog-posts");
  function renderPosts() {
    const posts = JSON.parse(localStorage.getItem("blogPosts") || "[]");
    postsDiv.innerHTML = "";
    posts.slice().reverse().forEach(post => {
      const el = document.createElement("div");
      el.className = "blog-post";
      el.innerHTML = `<h3>${post.title}</h3><small>${post.date} | Tags: ${post.tags}</small><p>${post.content}</p>`;
      postsDiv.appendChild(el);
    });
  }
  if(form){form.addEventListener("submit", e => {
    e.preventDefault();
    const title = document.getElementById("blog-title").value.trim();
    const content = document.getElementById("blog-content").value.trim();
    const tags = document.getElementById("blog-tags").value.trim();
    if (!title || !content) { alert("Please fill in all required fields."); return; }
    const newPost = { title, content, tags, date: new Date().toLocaleDateString() };
    const posts = JSON.parse(localStorage.getItem("blogPosts") || "[]");
    posts.push(newPost);
    localStorage.setItem("blogPosts", JSON.stringify(posts));
    form.reset();
    renderPosts();
  });}
  renderPosts();
});
