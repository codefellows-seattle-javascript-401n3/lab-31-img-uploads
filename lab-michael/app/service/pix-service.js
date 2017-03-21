'use strict';

module.exports = ['$q', '$log', '$http', 'Upload', 'authService', pixService];

function pixService($q, $log, $http, Upload, authService) {
  $log.debug('pixService');

  let service = {};

  service.uploadGalleryPix = function(galleryData, pixData) {
    $log.debug('uploadGalleryPix');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${galleryData._id}/pix`;
      let headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      };
      return Upload.upload({
        url,
        headers,
        method: 'POST',
        data: {
          name: pixData.name,
          desc: pixData.desc,
          file: pixData.file
        }
      });
    })
    .then(res => {
      galleryData.pix.unshift(res.data);
      return res.data;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };
  return service;
}
