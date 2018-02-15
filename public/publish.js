'use strict'

login((token)=>{
    $("#chainfile").fileinput({
        uploadUrl: `/api/upload/filechain?token=${token}`,
        overwriteInitial: false,
        maxFilesNum: 1,
        maxFileCount: 1,
        allowedFileTypes: ['object']
    });
});

$('#chainfile').on('fileuploaded', function(event, data, previewId, index) {
    var result = _.values(data.response)[0]
    $('#uploaded_fileHash').text(result.fileHash)
});



