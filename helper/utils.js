const sendJSON = (res, status, content) => {
  res.status(status);
  res.json(content);
};

const createContainer = (dockerConnection, masterName, imageName, containerName) => {
  dockerConnection.createContainer(
    {
      Image: imageName,
      name: containerName,
      HostConfig: {
        Binds: ["/env:/env"],
        Links: ["mysql:mysql", masterName + ":masterhost"],
      },
    },
    (connectErr, container) => {
      if (connectErr) {
        console.log('error while creating new container', connectErr);
        return 'error while creating new container'.concat(connectErr);
      } else {
        container.start((startErr) => {
          if (startErr) {
            console.log('error while starting new container', startErr);
            return 'error while starting new container'.concat(startErr);
          } else {
            let successMessage = containerName.concat(' started with container id: ').concat(container.id);
            console.log(successMessage);
            return successMessage;
          }
        });
      }
    }
  );
};

const removeContainer = (dockerConnection, containerName) => {
  const container = dockerConnection.getContainer(containerName);
  container.remove((err, data) => {
    if (err) {
      console.log('error while removing container', err);
    } else {
      console.log('successfully removed', containerName);
      console.log('data', data);
    }
  });
};

module.exports = { sendJSON, createContainer, removeContainer };
