<h1>EPKeygen - 秘密鍵をEpisoPassで作る</h1>

<ul>
  <li>EpisoPassでid_rsaを生成する</li>
  <li>EpisoPassのSeedを変換するとid_rsaになるようにする</li>
</ul>

<h2>Issues</h3>

<ul>
  <li>ブラウザは暗号計算に必要な値(MD5)だけ返すべき</li>
  <li>それを使ってmain.jsがid_rsaを生成すればよい</li>
  <li>問題は普通にqa.jsonで置いておく?</li>
  <li>id_rsa.cryptedから生成すると良いかもしれない</li>
</ul>


