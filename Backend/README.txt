1. build project in VS
2. docker build -t fun-test-zpi .
3. heroku container:login
4. heroku container:push -a fun-test-zpi web
5. heroku container:release -a fun-test-zpi web
