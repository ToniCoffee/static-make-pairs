/* function includeHTML() {
  // Loop through a collection of all HTML elements:
  const getAllHtmlTagsInDocument = document.getElementsByTagName('*');

  for (let i = 0; i < getAllHtmlTagsInDocument.length; i++) {
    const currentElement = getAllHtmlTagsInDocument[i];
    // search for elements with a certain atrribute:
    const fileToInclude = currentElement.getAttribute('to-include');

    if (fileToInclude) {
      // Make an HTTP request using the attribute value as the file name:
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            currentElement.innerHTML = this.responseText;
            console.log(this.responseText);
          }
          if (this.status == 404) {
            currentElement.innerHTML = 'Page not found.';
          }
          // Remove the attribute, and call this function once more:
          currentElement.removeAttribute('to-include');
          // includeHTML();
        }
      };
      xhttp.open('GET', fileToInclude, true);
      xhttp.send();
      // Exit the function:
      return;
    }
  }
} */

function delayAsync1(ms) {
  console.log('delayAsync1');
  return new Promise((resolve, reject) => {
    setTimeout(() => {resolve('executed');}, ms);
  });
}

function delayAsync(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (switchCarousel) resolve('hecho!');
      else reject('nop');
    }, ms);
  });
}

function getStyle(element, property) {
  return getComputedStyle(element).getPropertyValue(property);
}

function appendChildAt(elementToAppend, parent, index = 0) {
  parent.insertBefore(elementToAppend, parent.children[index]);
}

async function fetchByIDAsync(url, id = 1) {
  const query     = await fetch(`${url}${id}`);
  const response  = await query.json();
  return response;
}

/* async function getDataAsync(url, id, numberOfResults = 1) {
  const data = [];
  for (let i = 1; i <= numberOfResults; i++) {
    const query     = await fetch(`${url}${id}`);
    const response  = await query.json();
    data.push(response[0]);
  }
  return data;
} */

function setSessionStorage(key, data) {
  sessionStorage.setItem(key, JSON.stringify(data));
}

function redirectTo(url) { window.location.href = url; }

function includeHTMLAsync(method = 'GET', url) {
  return new Promise(function(resolve, reject) {
    // Loop through a collection of all HTML elements:
    const getAllHtmlTagsInDocument = document.getElementsByTagName('*');

    for (let i = 0; i < getAllHtmlTagsInDocument.length; i++) {
      const currentElement  = getAllHtmlTagsInDocument[i];
      // search for elements with a certain atrribute:
      const fileToInclude   = currentElement.getAttribute('to-include');

      if (fileToInclude) {
        // Make an HTTP request using the attribute value as the file name:
        const xhr               = new XMLHttpRequest();
        xhr.onreadystatechange  = function () {
          if (this.readyState == 4) {
            if (this.status == 200) {
              currentElement.innerHTML += this.responseText;
              resolve(this.responseText);
            }
            if (this.status == 404) {
              currentElement.innerHTML = 'Page not found.';
              reject({
                status: this.status,
                statusText: xhr.statusText
              });
            }
            // Remove the attribute, and call this function once more:
            currentElement.removeAttribute('to-include');
            includeHTMLAsync();
          }
        };
        xhr.open(method, fileToInclude, true);
        xhr.onerror = function () {
          reject({
              status: this.status,
              statusText: xhr.statusText
          });
        };
        xhr.send();
        // Exit the function:
        return;
      }
    }
  });
}

// https://stackoverflow.com/questions/48969495/in-javascript-how-do-i-should-i-use-async-await-with-xmlhttprequest
/* function makeRequest(method, url) {
  return new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.onload = function () {
          if (this.status >= 200 && this.status < 300) {
              resolve(xhr.response);
          } else {
              reject({
                  status: this.status,
                  statusText: xhr.statusText
              });
          }
      };
      xhr.onerror = function () {
          reject({
              status: this.status,
              statusText: xhr.statusText
          });
      };
      xhr.send();
  });
} */
