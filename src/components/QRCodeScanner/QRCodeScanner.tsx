import { formatDate, message } from "@/utils";
import { Button, Modal } from "antd";
import { ScanOutlined } from "@ant-design/icons";
import { Html5Qrcode, Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useMemo, useRef, useState } from "react";

const QRCodeScanner = (props: any) => {
  const { inputRef } = props;
  const [scannerView, setScannerView] = useState(false);
  const [scanData, setScanData] = useState("");
  const html5QrcodeScanner = useRef<any>(null);
  function onScanSuccess(decodedText: any, decodedResult: any) {
    // handle the scanned code as you like, for example:

    console.log(`Code matched = ${decodedText}`, decodedResult, inputRef);
    message.success(`Code matched = ${decodedText}`);
    setScanData(decodedText);
    setScannerView(false);
  }

  function onScanFailure(error: any) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    console.warn(`Code scan error = ${error}`);
  }
  const id = useMemo(() => {
    return new Date().getTime().toString();
  }, []);
  const onScan = () => {
    setScannerView(true);
  };
  useEffect(() => {
    if (scannerView) {
      html5QrcodeScanner.current = new Html5Qrcode(id);
      html5QrcodeScanner.current.start(
        {
          facingMode: "environment",
        },
        {
          fps: 10, //设置扫码识别速度
          qrbox: 280, //设置二维码扫描框大小
        },

        onScanSuccess,
        onScanFailure
      );
    }
    if (!scannerView) {
      html5QrcodeScanner?.current?.stop();
      html5QrcodeScanner.current = null;
    }
  }, [scannerView]);
  useEffect(() => {
    if (scanData) {
      inputRef.current.input.value = scanData;
    }
  }, [scanData]);
  return (
    <>
      <Modal
        open={scannerView}
        closable
        onCancel={() => {
          setScannerView(false);
        }}
        width={600}
        footer={null}
      >
        {scannerView && (
          <div
            style={{ padding: "20px", textAlign: "center", width: "80%" }}
            id={id}
          ></div>
        )}
      </Modal>
      <Button
        onClick={onScan}
        type="link"
        style={{ height: 20, lineHeight: "20px", width: 20 }}
        icon={<ScanOutlined />}
      ></Button>
    </>
  );
};

export default QRCodeScanner;
