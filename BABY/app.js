// 글 목록 데이터
let posts = [
  { title: "첫 번째 글", content: "안녕하세요! 게시판에 오신 것을 환영합니다." },
  { title: "두 번째 글", content: "이곳은 자유롭게 글을 작성할 수 있는 공간입니다." }
];

function renderPosts() {
  const postList = document.querySelector("#postList");
  postList.innerHTML = "";

  posts.forEach((post, index) => {
    const card = document.createElement("div");
    card.className = "card mb-2";
    card.innerHTML = `
      <div class="card-body">
        <h5 class="card-title mb-2"></h5>
        <p class="card-text mb-3"></p>
        <button class="btn btn-danger btn-sm" data-index="${index}">삭제</button>
      </div>
    `;
    // XSS 방지용: textContent로 주입
    card.querySelector(".card-title").textContent = post.title;
    card.querySelector(".card-text").textContent = post.content;
    postList.prepend(card);
  });
}

// 초기 렌더
renderPosts();

// 폼 제출
const form = document.querySelector("#postForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value.trim();
  const content = document.querySelector("#content").value.trim();
  if (!title || !content) return;

  posts.push({ title, content });
  renderPosts();
  form.reset();
});

// 삭제(이벤트 위임)
const postList = document.querySelector("#postList");
postList.addEventListener("click", (e) => {
  // tagName이 아니라 closest로 버튼을 찾는 게 안전
  const btn = e.target.closest("button.btn-danger");
  if (!btn) return;
  const index = Number(btn.dataset.index);
  if (!Number.isNaN(index)) {
    posts.splice(index, 1);
    renderPosts();
  }
});

/*
// 글 목록 저장할 배열
            let posts = [
                { title: "첫 번째 글", content: "안녕하세요! 게시판에 오신 것을 환영합니다." },
                { title: "두 번째 글", content: "이곳은 자유롭게 글을 작성할 수 있는 공간입니다." }
            ]; 

            function renderPosts(){
            // 글 목록 초기화
            const postList = document.querySelector("#postList");
            postList.innerHTML = ''; // 기존 글 목록 초기화
            
            // 배열에 있는 글들 카드 형태로 추가
            posts.forEach((post, index) => {
                postList.innerHTML += `
                    <div class="card mb-2">
                        <div class="card-body">
                            <h5 class="card-title">${post.title}</h5>
                            <p class="card-text">${post.content}</p>
                            <button class="btn btn-danger btn-sm" data-index="${index}">삭제</button>
                        </div>
                    </div>
                    `;
                });
            }

            // 글 작성 내용 가져오기 
            const form = document.querySelector("#postForm");

            form.addEventListener("submit", (e) => {
                e.preventDefault(); // 폼 제출 기본 동작 방지? 새로고침 방지라는데요

                const title = document.querySelector("#title").value;
                const content = document.querySelector("#content").value;
                
                posts.push({ title, content }); // 배열에 글 추가 !!
                renderPosts(); // 화면 갱신
                form.reset(); // 폼 초기화
            });

            const postList = document.querySelector("#postList");
            postList.addEventListener("click", (e) => {
                if(e.target.tagName === "BUTTON") {
                    const index = e.target.dataset.index;
                    posts.splice(index, 1); // 배열에서 글 삭제
                    renderPosts(); // 화면 갱신
                }
            });
*/