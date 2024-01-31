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
  });
}

window.addEventListener('turbo:load', post);