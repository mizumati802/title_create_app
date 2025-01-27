document.addEventListener("DOMContentLoaded", () => {
  // 付属オプションを定義
  const featureOptions = `
    <option value="" selected>なし</option>
    <option value="モンスターFur">モンスターファー</option>
    <option value="鬼ファー">鬼ファー</option>
    <option value="Fur Collar">襟ファー</option>
    <option value="Studs">Studs</option>
    <option value="Bijou">ビジュー</option>
    <option value="Crush加工">Crushクラッシュ</option>
    <option value="編込">編込</option>
    <option value="退廃">退廃</option>
    <option value="Cross">十字架CROSS</option>
    <option value="Skull">Skull</option>
    <option value="二次加工">二次加工</option>
    <option value="ギャル">ギャル</option>
    <option value="短丈">短丈</option>
    <option value="shirring">シャーリング</option>
  `;

  // 付属ドロップダウンを動的に生成
  const featuresContainer = document.getElementById("features-container");
  for (let i = 1; i <= 2; i++) {
    const label = document.createElement("label");
    label.setAttribute("for", `feature${i}`);
    label.textContent = `付属${i}:`;

    const select = document.createElement("select");
    select.id = `feature${i}`;
    select.innerHTML = featureOptions;

    featuresContainer.appendChild(label);
    featuresContainer.appendChild(select);
    featuresContainer.appendChild(document.createElement("br"));
  }

// アコーディオンの機能
const accordions = document.querySelectorAll('.accordion');
accordions.forEach(acc => {
  acc.addEventListener('click', function () {
    this.classList.toggle('active');
    const panel = this.nextElementSibling;
    if (panel.style.display === 'block') {
      panel.style.display = 'none';
    } else {
      panel.style.display = 'block';
    }
  });
});

// 直近で選択されたカテゴリの値を取得
let lastSelectedCategory = '';
document.querySelectorAll('.category-select').forEach(select => {
  select.addEventListener('change', function () {
    lastSelectedCategory = this.value;
  });
});

document.getElementById("generate-title").addEventListener("click", function () {
  // 各選択値を取得
  const year = document.getElementById("year").value;
  const prefix = document.getElementById("prefix").value;
  const material = document.getElementById("material").value;
  let feature1 = document.getElementById("feature1").value;
  let feature2 = document.getElementById("feature2").value;
  const style = document.getElementById("style").value;

  // タイトルを生成
  let keywords = [material, feature1, feature2].filter(keyword => keyword).join(" ");
  let title = `【${year}_${prefix}】 ${keywords} ${lastSelectedCategory} ${style}`;

  // 空白をすべて削除
  title = title.replace(/\s+/g, "");

  // 40文字を超える場合の処理
  if (title.length > 40) {
    keywords = [material, feature1].filter(keyword => keyword).join(" ");
    title = `【${year}_${prefix}】 ${keywords} ${lastSelectedCategory} ${style}`.replace(/\s+/g, "");
  }

  if (title.length > 40) {
    keywords = [material].filter(keyword => keyword).join(" ");
    title = `【${year}_${prefix}】 ${keywords} ${lastSelectedCategory} ${style}`.replace(/\s+/g, "");
  }

  // 文字数が40を超えている場合は赤にする
  const outputElement = document.getElementById("output");
  const charCountElement = document.getElementById("char-count");
  charCountElement.textContent = title.length;

  if (title.length > 40) {
    outputElement.value = title;
    outputElement.classList.add("red-text");
    outputElement.style.color = "red";
  } else {
    outputElement.value = title;
    outputElement.classList.remove("red-text");
    outputElement.style.color = "#333";
  }
});

// コピー機能
document.getElementById("copy-title").addEventListener("click", function () {
  const outputElement = document.getElementById("output");
  navigator.clipboard.writeText(outputElement.value).then(() => {
    // クラスを付与
    outputElement.classList.add("bg_copycomplete");
    // 1秒後にクラスを削除
    setTimeout(() => {
      outputElement.classList.remove("bg_copycomplete");
    }, 1000);
  }).catch(err => {
    // エラー処理（必要に応じて）
    console.error("コピーに失敗しました: ", err);
  });
});


document.getElementById("clear-title").addEventListener("click", () => {
  const textarea = document.getElementById("output");
  const charCount = document.getElementById("char-count");
  if (textarea) textarea.value = ''; // テキストエリアをクリア
  if (charCount) charCount.textContent = '0'; // 文字数をリセット
});




//mercaributton
function footer_mercariopenWindow() {
  const externalWindow = window.open("https://www.mercari.com/jp/", "_blank");
  setTimeout(() => {
    if (externalWindow) {
      externalWindow.close();
    } else {
      console.log("ウィンドウを開けませんでした（ポップアップがブロックされた可能性があります）。");
    }
  }, 100);
}

//titlebutton
function footer_templatebuttonopenWindow() {
  window.open('https://database-app-6ms4.onrender.com/template', '_blank');
}

});