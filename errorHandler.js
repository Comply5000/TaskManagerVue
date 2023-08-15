// errorHandler.js

export function handleErrors(error, errorsArray) {
    if (error.response && error.response.status === 400) {
      if (error.response.data.errors) {
        const errorFields = Object.keys(error.response.data.errors);
        errorFields.forEach(field => {
          const fieldErrors = error.response.data.errors[field];
          if (fieldErrors.length >= 2) {
            errorsArray.push(fieldErrors[1]);
          }
        });
      } else if (error.response.data.title && error.response.data.status) {
        errorsArray.push(error.response.data.title);
      } else {
        errorsArray.push('Sorry, there was an error. Please try again.');
      }
    } else {
      errorsArray.push('Sorry, there was a problem connecting to the server. Please try again later.');
    }
  }