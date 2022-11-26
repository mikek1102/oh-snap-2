var bucketName = "mk-oh-snap-2";
var bucketRegion = "us-east-1";
var IdentityPoolId = "us-east-1:f4bfb736-37fc-46f1-b659-65b2deb713f4";


AWS.config.update({
               region: bucketRegion,
               credentials: new AWS.CognitoIdentityCredentials({
               IdentityPoolId: IdentityPoolId
               })
           });

           var s3 = new AWS.S3({
               apiVersion: '2006-03-01',
               params: {Bucket: bucketName}
       });

       function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#output')
                    .attr('src', e.target.result)
                    .width(150)
                    .height(200);
            };
            
            reader.readAsDataURL(input.files[0]);
        }
        else {
            var img = input.files;
              $('#output').attr('src',img).height(200);
        }
    };
       
       function s3upload() { 
            
           var files = document.getElementById('camera').files;
           if (files) 
           {
               var file = files[0];
               var fileName = Math.floor(Math.random() * 10000000) + file.name;
               var filePath = 'mk-oh-snap-2/' + fileName;
               var fileUrl = 'https://' + 'us-east-1' + '.amazonaws.com/mk-oh-snap-2/' +  filePath;
               $("#camera").val('');
               $("#output").val('');
               
            function clearPreview(){
               readURL(input).value('');
               reader.clear();
            }
               
       
               s3.upload({
                               Key: filePath,
                               Body: file,
                               ACL: 'public-read'
                           }, function(err, data) {
                               if(err) {
                                   reject('error');
                               }
                               
                               alert('Successfully Uploaded!');
                           }).on('httpUploadProgress', function (progress) {
                               var uploaded = parseInt((progress.loaded * 100) / progress.total);
                               $("progress").attr('value', uploaded);
                           });
           }
 };