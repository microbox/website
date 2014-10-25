FROM erealm/nodejs-development:0.10.32

# Create non-root user
RUN useradd -ms /bin/bash one
RUN mkdir -p /home/one/{tmp,website} && chown -R one:one /home/one
ENV HOME /home/one
ENV TMPDIR /home/one/tmp

# Install OneBase Web Portal packages from NPM
ADD package.json /home/one/website/package.json
RUN cd /home/one/website && \
    npm install && \
    cd /home/one/tmp && \
    rm -rf *

# Make everything available for grunt
ADD .bowerrc        /home/one/website/.bowerrc
ADD .csslintrc      /home/one/website/.csslintrc
ADD .jscsrc         /home/one/website/.jscsrc
ADD .jshintrc       /home/one/website/.jshintrc
ADD .nodemonignore  /home/one/website/.nodemonignore
ADD bower.json      /home/one/website/bower.json
ADD gruntfile.js    /home/one/website/gruntfile.js
ADD server.js       /home/one/website/server.js

# setup workdir
WORKDIR /home/one/website

# Run as non-root user
# currently have to run as root, due to issue: https://github.com/docker/docker/issues/3124
USER one

# Mapping Volumes
VOLUME ["/home/one/website/app"]
VOLUME ["/home/one/website/conf"]
VOLUME ["/home/one/website/lib"]
VOLUME ["/home/one/website/public"]

# Port 3000 for server
# Port 35729 for livereload
EXPOSE 3000 35729

CMD ["grunt"]
