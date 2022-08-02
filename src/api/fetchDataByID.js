export function fetchDataByID(url) {
  const fetches = [];
  for (let i = 0; i < 100; i++) {
    fetches.push(
      fetch(url + i)
        .then((res) => {
          if (res.ok) return res.json();
          else {
            const err = new Error("Not 200 response");
            err.response = res;
            throw err;
          }
        })
        .then((data) => {
          return data;
        })
        .catch(function (err) {
          // do nothing
        })
    );
  }
  return Promise.all(fetches);
}
