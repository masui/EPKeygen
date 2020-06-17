<h1>EPKeygen - 秘密鍵をEpisoPassで作る</h1>

<ul>
  <li><a href="https://EpisoPass.com/">EpisoPass</a>で<code>id_rsa</code>を管理する</li>
  <li><code>id_rsa</code>が存在する状況でEPKeygenを動かすと<code>id_rsa_episopass</code>ができる</li>
  <li><code>id_rsa</code>を消してEPKeygenを動かすと<code>id_rsa</code>が復活する</li>
  <li>ふだんは<code>id_rsa_episopass</code>だけパソコンに置いておけばいい</li>
  <li>必要なときだけ<code>id_rsa</code>を作ればいい</li>
</ul>

<h2>Issues</h3>

<ul>
  <li>ブラウザは暗号計算に必要な回答リストだけ返す
  <li>それを使ってmain.jsがmd5を計算してid_rsaを生成する</li>
  <li>問題は普通にqa.jsonで置いておく</li>
  <li>暗号化したものはid_rsa_episopassというファイルに書いておく</li>
</ul>

