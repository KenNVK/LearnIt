<template>
  <div class="main">
    <div class="row gy-3">
      <div class="background col-lg-3">
        <h4>Hey! I'm Khoa.</h4>
      </div>
      <div class="info">
        <h1 class="title">About me</h1>
        <div class="info-basic-wrap">
          <div class="info-basic">
            <div>
              <span class="info-basic-title">Hobbies:</span> Music, Sports, Internet surfing.
            </div>
            <div><span class="info-basic-title">Nationality:</span> Vietnamese.</div>
            <div><span class="info-basic-title">Location:</span> Osaka, Japan.</div>
            <div><span class="info-basic-title">Languages:</span> Vietnamese, Japanese.</div>
          </div>
          <div class="info-basic">
            <div>
              <span class="info-basic-title">Education:</span><br />
              <span>Phan Van Tri Highschool(2008-2011).</span><br />
              <span>Vietnam Aviation Academy(2012-2015).</span><br />
              <span>Shin-ai Institute of Languages(2016-2018).</span><br />
              <span>ECC Kokusai College of Foreign Languages(2018-2019).</span><br />
              <span>ECC Computer College (2019-2022).</span><br />
              <br />
            </div>
          </div>
        </div>
        <div class="info-skill">
          <div>
            <span class="info-skill-title">Skill:</span>
            <div class="info-skill-swap">
              <span class="skill">Linux</span>
              <span class="skill">HTML/CSS</span>
              <span class="skill">JavaScript</span>
              <span class="skill">Nodejs</span>
              <span class="skill">VueJs</span>
              <span class="skill">Network</span>
              <span class="skill">Git</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.main {
  min-height: calc(100vh - 108px);
  overflow: hidden;
}

.background {
  width: 500px;
  min-height: calc(100vh - 108px);
  background: url("../assets/images/kyoto.jpg");
  background-size: cover;
  background-position: center;
  box-shadow: 0 0 8px 4px rgba(0, 0, 0, 0.1);
}

.background h4 {
  text-align: center;
  color: #424242;
  padding: 10px;
  font-weight: 500;
}

.info {
  flex: 1;
  text-align: center;
}

.info .title {
  font-style: italic;
}

.info .info-basic-wrap {
  display: flex;
}

.info .info-basic,
.info .info-skill {
  margin: 20px;
  padding: 20px;
  text-align: left;
}

.info .info-skill {
  background: rgba(217, 217, 217, 0.5);
}

.info .info-basic-title,
.info .info-skill-title {
  font-size: 1.1rem;
  font-weight: 600;
}

.info-skill-swap {
  padding: 10px;
}

.info .skill {
  display: inline-block;
  margin: 10px;
  padding: 4px 6px;
  background: #dbdbdb;
  box-shadow: 0 0 3px rgba(255, 255, 255, 0.1);
}
</style>
