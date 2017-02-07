# fd-api
Node.js API - Delivering content to server outside through various levels of security. #filetransfer

### Assumption to problem statement
- Any link created from host A to host B is unidirectional and can not be used for reverse transformation.

## Getting started
- [X] Install dependencies `npm i`
- [X] Start the server `npm run dev`
- [X] Run the tests `npm t`

### Endpoints
- [X] POST /host
```
{
  "host": $host_name
}
```
- [X] GET /hosts
- [X] POST /link
```
{
  "source": $source_host_name
  "dest": $dest_host_name
  "description": $description
}
```
- [X] GET /links
- [X] GET /path/{A}/to/{B}, where A and B are hosts
