# What this project does

This express js project includes an api of get route to `/api/lines` which will read lines from out.txt file from project root and
return them as array of strings. App will stream the json to the response (i.e. as the handler receives the line from file, the json string will be sent to the client for the same using response stream), because of which error handling becomes
difficult to implement.

# Performance tactics used

## Event-Stream

Used `event-stream` to efficiently read one line at a time from file without storing whole file contents in memory.

## Toobusy-js

Used `toobusy-js` to check if server is too busy to handle request.

## Graceful-fs

Helps deal with `EMFILE` error which is thrown when too many files are open at the same time.

# Steps

- Generate out.txt file using `src/generate-out-file.js` file
- Run server using `start` script
- Run performance test using `doctor`, `flame` and `bubble` scripts
