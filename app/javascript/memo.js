const buildHTML = (XHR) => {
  const item = XHR.response.post;
  const html = `
    <div class="post">
      <div class="post-date">
        投稿日時：${item.created_at}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`;
  return html;
};

function post() {
  const form = document.getElementById("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const XHR = new XMLHttpRequest();
    
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json";

    XHR.addEventListener("load", function () {
      // レスポンスが成功の場合
      if (this.status === 200) {
        // ここで成功時の処理を実行
        console.log("Post successful");
        // 例: 成功時にページをリロードするなどの処理を追加
        location.reload();
      } else {
        // エラーの場合に適切な処理を行う
        console.error("Post failed");
      }
    });

    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200){
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      };
      const list = document.getElementById("list");
      const formText = document.getElementById("content");
      list.insertAdjacentElement("afterend", build(XHR));
      formText.value = "";
    };
  });
};

window.addEventListener('turbo:load', post);