import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useGoogleToken } from "@/context/GoogleTokenContext";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSheetContext } from "@/context/SheetContext";
import { Badge } from "@/components/ui/badge";
import http from "@/services/httpService";
import GoogleInit from "../GoogleInit";
import {
  useCreateSheet,
  useAppendRows,
  useUpdateValues,
  useDeleteValues,
  useCreateChart,
  useAddTable,
} from "@/hooks/useSheet";

const AiChatBox = () => {
  const { googleToken, clearGoogleToken } = useGoogleToken();
  const { setSheet, sheetId, title } = useSheetContext();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState<any[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    clearGoogleToken();
  }, []);

  // Log the sheetId whenever it changes
  useEffect(() => {
    if (sheetId) {
      console.log("Active Sheet ID:", sheetId);
    }
  }, [sheetId]);

  const createSheetMutation = useCreateSheet(googleToken);
  const appendRowsMutation = useAppendRows(googleToken);
  const updateValuesMutation = useUpdateValues(googleToken);
  const deleteValuesMutation = useDeleteValues(googleToken);
  const createChartMutation = useCreateChart(googleToken);
  const addTableMutation = useAddTable(googleToken);

  // Define interfaces for each action type
  interface CreateSheetTask {
    title: string;
  }
  interface AppendRowsTask {
    range?: string;
    values: any[][];
  }
  interface UpdateValuesTask {
    range?: string;
    values: any[][];
  }
  interface ClearValuesTask {
    range?: string;
  }
  interface CreateChartTask {
    chartType: string;
    title: string;
    range?: string;
    position?: any;
  }
  interface AddTableTask {
    sheetTitle?: string;
    range?: string;
    tableName?: string;
    columnTypes?: any;
  }

  // Union type for all possible actions
  type Task =
    | { createSheet: CreateSheetTask }
    | { appendRows: AppendRowsTask }
    | { updateValues: UpdateValuesTask }
    | { clearValues: ClearValuesTask }
    | { createChart: CreateChartTask }
    | { addTable: AddTableTask };

  // Update the function signature
  const automateTasks = async (tasks: Task[]) => {
    let sheetId = "";
    console.log("Processing task:", tasks);

    for (const task of tasks) {
      const [action, payload] = Object.entries(task)[0] as [string, any];
      console.log("Processing task:", action, payload);
      try {
        switch (action) {
          case "createSheet": {
            const result = await createSheetMutation.mutateAsync(payload.title);
            setSheet(result, payload.title);
            sheetId = result;
            break;
          }
          case "appendRows": {
            await appendRowsMutation.mutateAsync({
              spreadsheetId: sheetId,
              range: payload.range || "Sheet1",
              values: payload.values,
            });
            break;
          }
          case "updateValues": {
            await updateValuesMutation.mutateAsync({
              spreadsheetId: sheetId,
              range: payload.range || "Sheet1",
              values: payload.values,
            });
            break;
          }
          case "clearValues": {
            await deleteValuesMutation.mutateAsync({
              spreadsheetId: sheetId,
              range: payload.range || "Sheet1",
            });
            break;
          }
          case "createChart": {
            await createChartMutation.mutateAsync({
              spreadsheetId: sheetId,
              chartType: payload.chartType,
              title: payload.title,
              range: payload.range || "Sheet1!A1:B20",
              position: payload.position,
            });
            break;
          }
          case "addTable": {
            await addTableMutation.mutateAsync({
              spreadsheetId: sheetId,
              sheetTitle: payload?.sheetTitle || "Sheet1",
              range: payload?.range,
              tableName: payload?.tableName,
              columnTypes: payload?.columnTypes,
            });
            break;
          }
          default:
            console.warn("Unknown action:", action);
        }
      } catch (error) {
        console.error(`❌ Error executing task "${action}":`, error);
        throw error;
      }
    }
  };

  const handleAutomate = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await http.post("/ai/sheet-planner", { prompt: input });
      let aiTasks = res.data;

      // Filter out any existing "addTable" task to ensure it's added only once
      aiTasks = aiTasks.filter((t: any) => t.action !== "addTable");

      // Define the addTable task payload
      const addTableTask = {
        addTable: {
          sheetTitle: "Sheet1",
          range: "Sheet1!A1:Z20",
          tableName: "AutoTable",
          columnTypes: [
            // Fill in column definitions or fetch dynamically if needed
          ],
        },
      };

      // Add it at the end
      aiTasks.push(addTableTask);

      setTasks(aiTasks);
      await automateTasks(aiTasks);
      setInput("");
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-6 relative">
      <p>{JSON.stringify(tasks)}</p>
      <div className="border rounded-2xl min-h-[52vh] p-4 bg-gradient-to-br from-slate-50 via-white to-slate-100 shadow-sm flex flex-col justify-between transition-all">
        {/* Sheet info UI */}

        {!googleToken && (
          <Card className="absolute bg-gradient-to-br from-red-50 via-white to-red-100  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20  flex items-center justify-center ">
            <CardContent className="text-center w-full">
              <div className="font-semibold text-lg mb-2">
                Google Sheets Access Required
              </div>
              <div className="text-sm text-muted-foreground mb-4">
                You need to allow access to Google Sheets to use this feature.
                <br /> details, please review our{" "}
                <Link href={""} className="text-blue-400">
                  Privacy Policy.
                </Link>
              </div>
              <GoogleInit />
            </CardContent>
          </Card>
        )}
        {/* Main content area */}
        <div className="flex flex-col gap-2">
          {" "}
          {sheetId && (
            <div className="mb-2 text-sm font-semibold text-green-700 flex items-center gap-2">
              <span>Active Sheet:</span>
              <Badge
                variant="outline"
                className="font-bold text-green-800 border-green-400 bg-green-50"
              >
                title:{title}
              </Badge>
              {sheetId && (
                <span className="ml-2 text-xs text-muted-foreground">
                  (ID: {sheetId})
                </span>
              )}
            </div>
          )}
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {tasks.length > 0 && (
            <pre className="bg-slate-100 rounded p-2 text-xs overflow-x-auto">
              {JSON.stringify(tasks, null, 2)}
            </pre>
          )}
        </div>
        {/* Input and button at the bottom */}
        <div className="mt-4 w-full">
          <div className="flex justify-end mt-2">
            <Button
              variant="default"
              onClick={handleAutomate}
              disabled={!input.trim() || loading || !googleToken}
            >
              <Sparkles fill="white" className="mr-2 h-4 w-4" /> Automate
            </Button>
          </div>
          <Textarea
            placeholder="Enter your instructions here..."
            minLength={1}
            rows={3}
            className="min-h-[80px] rounded-lg w-full mt-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading || !googleToken}
          />
        </div>
      </div>
    </section>
  );
};

export default AiChatBox;
