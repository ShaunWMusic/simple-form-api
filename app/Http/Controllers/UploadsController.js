'use strict';
const File = use('File') // or use('AdonisFilesystem/Filesystem') if you did not install the alias




class UploadsController {
//
* index(request, response) {
  yield File.get('app.js')
}

* store(request, response) {
  const avatar = request.file('avatar', {
      maxSize: '2mb',
      allowedExtensions: ['jpg', 'png', 'jpeg']
  })

  yield File.upload(avatar.clientName(), avatar)
}



* show(request, response) {
    yield File.get('app.js')
}

* update(request, response) {
  yield File.put('app.js', 'This is the contents of my file')
}

* destroy(request, response) {
    yield File.delete('app.js')
}

// This is from the Youtube video ember and S3 upload
// * sign(request, response) => {
//
//   let expires = new Date(Date.now() + 120000);
//
//   let creds = S3PolicyServices({
//     secret:   process.env.S3_SECRET,
//     acl:      'public-read',
//     bucket:   process.env.S3_BUCKET,
//     expires:  expires
//   });
//
//   response({
//     'acl':            'public-read',
//     'awsaccesskeyid': process.env.S3_KEY,
//     'bucket':         process.env.S3_BUCKET,
//     'Cache-Control':  'max-age=630720000, public',
//     'Content-Type':   req.query.type,
//     'expires':        expires,
//     'key':            'posts-base/images/originals/' + req.query.name,
//     'policy':         creds.policy,
//     'signature':      creds.signature,
//     'success_action_status': '201'
//   })
// }


}
