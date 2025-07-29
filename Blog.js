
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////// store data in local storage ////////
  function submitPost() {
    // نجمع البيانات من الفورم
    var title = document.getElementById("postTitle").value;
    var content = document.getElementById("postContent").value;
    var imageInput = document.getElementById("postImage");

    // نتحقق إن الحقول مش فاضية
    if (!title || !content || !imageInput.files[0]) {
      alert("من فضلك املأ كل الحقول");
      return;
    }

    // نقرأ الصورة كـ DataURL
    var reader = new FileReader();
    reader.onload = function (e) {
      var imageSrc = e.target.result;

      var newPost = {
        title: title,
        content: content,
        image: imageSrc,
        author: "Zeinab", // تقدر تحطي اسم المستخدم هنا
        likes: 0,
        comments: 0
      };

      // نجيب البوستات القديمة
      var posts = JSON.parse(localStorage.getItem("posts")) || [];

      // نضيف البوست الجديد
      posts.unshift(newPost);

      // نخزنهم تاني
      localStorage.setItem("posts", JSON.stringify(posts));

      // نعرضهم تاني
      renderPosts();

      // نفرغ الفورم
      resetForm();
      window.location.href = "Blog.html";
    };

    reader.readAsDataURL(imageInput.files[0]);
  }

  function resetForm() {
    document.getElementById("postTitle").value = "";
    document.getElementById("postContent").value = "";
    document.getElementById("postImage").value = "";
  }
///////////////////////////////////////////////////////////////////////////////////////////////////////////


  function renderPosts() {
    var container = document.getElementById("postsContainer");
    container.innerHTML = "";

    var posts = JSON.parse(localStorage.getItem("posts")) || [];

    for (let i = 0; i < posts.length; i++) {
      var post = posts[i];

      var card = document.createElement("div");
      card.style.width = "50%";
      card.style.margin = "20px auto";
      card.style.padding = "15px";
      card.style.textAlign = "center";

      card.innerHTML = `
        <h3>${post.title}</h3>
        <p><strong>By:</strong> ${post.author}</p>
        <img src="${post.image}" style="width:100%; border-radius:8px;" alt="Post image">
         <p style="text-align: justify;">
    ${post.content}
  </p>
        <p>
  <i class="fa-solid fa-heart" style="color: gray;"></i> ${post.likes} Likes
  |
  <i class="fa-solid fa-comment" style="color: gray;"></i> ${post.comments} Comments
</p>

      `;

      container.appendChild(card);
    }
  }

  // نعرض البوستات عند فتح الصفحة
  window.onload = function () {
    renderPosts();
  };






