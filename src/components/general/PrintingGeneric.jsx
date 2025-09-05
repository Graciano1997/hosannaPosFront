import { useSelector } from "react-redux";
import { openInvoiceView } from "../../slices/appSlice";
import { printing } from "../../slices/printerSlice";

export const PrintingGeneric = ({queueId='', rejectedMessage='', pdf_url = null} ) => {

    const { printerConfiguration } = useSelector((state) => state.printerState);

    if (printerConfiguration.finishAndprint == "true") {

        if (printerConfiguration.print_from_browser == "true") {
            dispatch(openInvoiceView(pdf_url));
        } else {
            dispatch(printing({
                copyNumber: parseInt(printerConfiguration.copyNumber),
                pdfUrl: pdf_url,
                printer: printerConfiguration.printer,
                queueId: queueId
            }))
            .then((printingResultState) => {
                if (printing.rejected.match(printingResultState)) {
                    dispatch(showToast({ warning: true, message: rejectedMessage }));
                    return false;
                }
            })
        }
    }

    return true;
};
