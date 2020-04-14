import {Observable} from "rxjs";

export function createHttpObservable(url: string) {
  return new Observable(observer => {

    const controller = new AbortController();
    const signal = controller.signal;

    fetch(url, {
      signal
    })
      .then(response => {
        return response.json();
      })
      .then(body => {
        observer.next(body);
        observer.complete();
      })
      .catch(reason => {
        observer.error(reason);
      });

    return () => controller.abort();
  });
}

