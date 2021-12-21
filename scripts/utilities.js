function delayAsync(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {resolve('executed');}, ms);
  });
}

/* function delayAsync(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (switchCarousel) resolve('hecho!');
      else reject('nop');
    }, ms);
  });
} */

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
