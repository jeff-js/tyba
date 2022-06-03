FROM postgres:11.5
ENV POSTGRES_HOST_AUTH_METHOD=trust
RUN echo "en_US.UTF-8 UTF-8\nde_DE.UTF-8 UTF-8" >> /etc/locale.gen && locale-gen
