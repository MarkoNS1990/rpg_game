const fetch = require('node-fetch');

const sortData = (object) => {
  const arr = [];
  for (let i = 0; i < object.length; i += 1) {
    arr.push([object[i].user, object[i].score]);
  }
  const sortedArr = Array.from(arr).sort((a, b) => b[1] - a[1]);
  return sortedArr;
};

const submitHighScore = async (
  gameId = 'sE9vcMfTu6omIF4NoCp3',
  name,
  score,
) => {
  const submit = {
    user: name,
    score,
  };
  const post = JSON.stringify(submit);
  const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores/`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: post,
    });
    const answer = await response.json();
    return answer;
  } catch (error) {
    return error;
  }
};

const getHighScores = async (gameId = 'sE9vcMfTu6omIF4NoCp3') => {
  const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores/`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const answer = await response.json();
    const sortedData = sortData(answer.result);
    return sortedData;
  } catch (error) {
    return error;
  }
};

export { submitHighScore, getHighScores };