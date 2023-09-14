FROM ruby:3.2.0
RUN apt-get update && apt-get install -y build-essential libpq-dev nodejs
WORKDIR /api
COPY Gemfile /api/Gemfile
COPY Gemfile.lock /api/Gemfile.lock
RUN bundle install
COPY . /backend