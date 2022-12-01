import axios from "axios";
import { toast } from "react-toastify";

import { config, errorToast, fileDownload } from "../../utils/globalFunc";

export const send_email_reminder = (invoice_id, setReminderLoading) => {
    setReminderLoading(true);
    axios
        .get(
            `/api/v1/send_email_reminder/${invoice_id}`,
            {
                responseType: "blob",
            },
            config
        )
        .then((res) => {
            setReminderLoading(false);
            toast.success(res?.data?.success);
        })
        .catch((err) => {
            setReminderLoading(false);
            toast.error("Service unavailable. Please try again later");
            errorToast(err);
        });
};
