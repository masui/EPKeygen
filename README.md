<h1>EPKeygen - 秘密鍵をEpisoPassで作る</h1>

<ul>
  <li><a href="https://EpisoPass.com/">EpisoPass</a>で<code>~/.ssh/id_rsa</code>を管理する</li>
  <li><code>~/.ssh/id_rsa</code>が存在する状況でEPKeygenを動かすと<code>~/.ssh/id_rsa_episopass</code>ができる</li>
  <li><code>~/.ssh/id_rsa</code>を消してEPKeygenを動かすと<code>~/.ssh/id_rsa</code>が復活する</li>
  <li>ふだんは<code>~/.ssh/id_rsa_episopass</code>だけパソコンに置いておけばいい</li>
  <li>必要なときだけ<code>~/.ssh/id_rsa</code>を作ればいい</li>
</ul>

<h2>実装など</h3>

<ul>
  <li>レンダリングプロセスは暗号計算に必要な回答リストだけ返す
  <li>それを使って<code>main.js</code>がmd5を計算して<code>id_rsa</code>を生成する</li>
  <li>問題は<code>~/.ssh/qa.json</code>に書いておく</li>
</ul>

