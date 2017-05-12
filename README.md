# zuni-data-app
A data collection application

1. clone repository
2. cd into public folder
3. run 'npm install' (npm has to be installed on your computer) - this will pull in dependencies
4. run http-server in /public

5. to run less watch: watch-less -c -e .css -i ./resources/ in public directory
-- OR --
6. to compile less main, run "lessc base.less base.css"

Info
1. First accordion is expanded because it's required for each find
2. when submitting, the form generates an ID
3. lat lng

- TODO
- rim radius vs diameter?
- prov, spec, and ID
- put most up to date version on site
- id: datetimelatlng
- keep in the same order
- appCache to download files
- show # of items successfully synced

Issues
- because unique ID is a timestamp, you can save multiple times and it adds a new record instead of rewriting,
  to fix this, routing to hope and showing new entry
- better ID, seems very long...
- sync button is disabled unless there are records to sync
-