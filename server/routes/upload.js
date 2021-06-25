const Minio = require("minio");
const delDir = require("../utils/delDir");

const endPoint = "localhost";
const port = 9000;
const accessKey = "minioadmin";
const secretKey = "minioadmin";
let bucket = "files";
const minioClient = new Minio.Client({
  endPoint,
  port,
  useSSL: false,
  accessKey,
  secretKey,
});
let metaData = {
  "X-Amz-Meta-Testing": 1234,
  example: 5678,
};
const upload = {
  upload: (req, res) => {
    minioClient.fPutObject(
      bucket,
      req.file.originalname,
      req.file.path,
      metaData,
      (error, etag) => {
        if (error) {
          res.send(null, "F0001", error);
        } else {
          let responseData = {
            fileName: req.file.originalname,
            fileUrl:
              endPoint +
              ":" +
              port +
              "/" +
              bucket +
              "/" +
              req.file.originalname,
            fileSize: req.file.size,
          };
          delDir("uploads"); // 删除本地临时文件夹
          res.json(res.setUnifyResFormat(responseData, "00000", "上传成功"));
        }
      }
    );
  },
};
module.exports = upload;
