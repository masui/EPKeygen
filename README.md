<h1>EPKeygen - 秘密鍵をEpisoPassで作る</h1>

<ul>
  <li>EpisoPassでid_rsaを生成する</li>
  <li>EpisoPassのSeedを変換するとid_rsaになるようにする</li>
</ul>

<h2>Issues</h3>

<ul>
  <li>ブラウザは暗号計算に必要な回答リストだけ返す
  <li>それを使ってmain.jsがmd5を計算してid_rsaを生成する</li>
  <li>問題は普通にqa.jsonで置いておく</li>
  <li>暗号化したものはid_rsa_episopassというファイルに書いておく</li>
</ul>

