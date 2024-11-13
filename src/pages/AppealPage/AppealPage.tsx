import {
  App,
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Upload,
  UploadProps,
} from "antd";
import { DeleteOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import styles from "./index.module.scss";
import { AnyObject } from "antd/es/_util/type";
import { insertAppealInfo } from "@/api";
import { ERROR_MESSAGE, SUCCESS_CODE } from "@/constants";
import { message } from "@/utils";

const AppealPage = (props: {
  id?: number;
  department?: string;
  finishTime?: string;
  setRefreshFlag: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { id, setRefreshFlag, finishTime, department } = props;

  const [fileList, setFileList] = useState<any[]>([]);
  const [imgList, setImgList] = useState<AnyObject>({});
  const [previewImg, setPreviewImg] = useState("");
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [form] = Form.useForm();
  const getBase64 = (file: Blob): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const onPreview = async (file: any) => {
    let src = await getBase64(file);
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as any);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    console.log(form.getFieldValue("multipartFile"), 1234421);
    setPreviewImg(src);
    setPreviewModalOpen(true);
  };
  const onRemove = (file: any) => {
    const filteredList = fileList.filter((item: any) => item.uid !== file.uid);
    setFileList(filteredList);

    form.setFieldValue(
      "multipartFile",
      filteredList?.length === 0 ? undefined : { fileList: filteredList }
    );
  };
  const draggerProps: UploadProps = {
    accept: ".png,.jpg,.jpeg,.gif",
    beforeUpload: (file: any) => {
      console.log(file, 11231);
      setFileList([...fileList, file]);
      getBase64(file).then((res) => {
        setImgList({ ...imgList, [file?.name]: res });
      });
      return false; // 阻止自动上传
    },
    fileList,
    itemRender: (originNode, file) => {
      return (
        <div
          style={{
            backgroundImage: `url(${imgList?.[file?.name]})`,
          }}
          className={styles.imgItem}
        >
          <div className={styles.imgButtons}>
            <Button
              icon={<DeleteOutlined />}
              type="link"
              danger
              onClick={() => onRemove(file)}
            ></Button>
            <Button
              icon={<EyeOutlined />}
              type="link"
              onClick={() => onPreview(file)}
            ></Button>
          </div>
        </div>
      );
    },
  };

  return (
    <div style={{ marginTop: 16 }}>
      <Form
        name="basic"
        layout="vertical"
        form={form}
        onFinish={(values) => {
          const formData = new FormData();
          formData.append(
            "reasonView",
            new Blob(
              [
                JSON.stringify({
                  parentId: values.parentId,
                  number: values.number,
                  reason: values.reason,
                }),
              ],
              { type: "application/json" }
            )
          );
          fileList?.forEach((file: string | Blob, index: any) => {
            formData.append(`multipartFile`, file);
          });

          insertAppealInfo(formData)
            .then((res) => {
              if (SUCCESS_CODE.indexOf(res?.data?.code) !== -1) {
                message.success(res?.data?.data);
                setRefreshFlag((flag) => !flag);
              } else {
                message.error(res?.data?.data || res?.response?.data?.msg);
              }
            })
            .catch((err) => {
              message.error(ERROR_MESSAGE);
            });
        }}
        initialValues={{ parentId: id, department, finishTime }}
      >
        <Form.Item name="parentId" label="id">
          <Input style={{ width: 350 }} readOnly></Input>
        </Form.Item>
        <Form.Item name="department" label="部门">
          <Input style={{ width: 350 }} readOnly></Input>
        </Form.Item>
        <Form.Item name="finishTime" label="交期">
          <Input style={{ width: 350 }} readOnly></Input>
        </Form.Item>
        <Form.Item
          name="number"
          label="张数"
          required
          rules={[{ required: true, message: "请输入张数" }]}
        >
          <InputNumber style={{ width: 350 }}></InputNumber>
        </Form.Item>
        <Form.Item
          name="reason"
          label="原因"
          required
          rules={[{ required: true, message: "请输入申诉原因" }]}
        >
          <Input.TextArea
            style={{ width: 350, maxWidth: 350 }}
          ></Input.TextArea>
        </Form.Item>
        <Form.Item
          name="multipartFile"
          label="图片"
          required
          rules={[{ required: true, message: "请上传至少一张图片" }]}
        >
          <Upload
            style={{ width: 350, maxWidth: 350, marginBottom: 12 }}
            {...draggerProps}
            className={styles.uploadImg}
            listType="picture-card"
          >
            <PlusOutlined style={{ fontSize: 24 }} />
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" style={{ width: 350 }} htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
      <Modal
        open={previewModalOpen}
        width={1200}
        onCancel={() => {
          setPreviewModalOpen(false);
        }}
        onOk={() => {
          setPreviewModalOpen(false);
        }}
        cancelButtonProps={{ style: { display: "none" } }}
        title="预览"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 400,
          }}
        >
          <img src={previewImg} alt="" style={{ maxWidth: "100%" }}></img>
        </div>
      </Modal>
    </div>
  );
};

export default AppealPage;
