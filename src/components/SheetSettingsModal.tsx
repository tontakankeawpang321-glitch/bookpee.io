import React, { useState, useEffect } from 'react';
import { X, FileSpreadsheet, RefreshCw, CheckCircle2, RotateCcw, AlertCircle, Layers, ExternalLink } from 'lucide-react';
import { getSheetUrls, saveSheetUrls, resetSheetUrls, syncThaiBooksOnly } from '../services/sheetSync';
import { ThaiDocBook } from '../types';

interface SheetSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSyncSuccess: (books: ThaiDocBook[]) => void;
  currentSheetCounts: {
    sheet1: number;
    sheet2: number;
    sheet3: number;
    total: number;
  };
}

export const SheetSettingsModal: React.FC<SheetSettingsModalProps> = ({
  isOpen,
  onClose,
  onSyncSuccess,
  currentSheetCounts
}) => {
  const [sheet1Url, setSheet1Url] = useState('');
  const [sheet2Url, setSheet2Url] = useState('');
  const [sheet3Url, setSheet3Url] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Load existing URLs when modal opens
  useEffect(() => {
    if (isOpen) {
      const urls = getSheetUrls();
      setSheet1Url(urls.sheet1Url || urls.masterUrl || '');
      setSheet2Url(urls.sheet2Url || '');
      setSheet3Url(urls.sheet3Url || '');
      setStatusMessage(null);
      setErrorMessage(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveAndSync = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage('กำลังบันทึกและดึงข้อมูลทีละ 1,000 เล่มจากทั้ง 3 ชีท...');
    setErrorMessage(null);

    try {
      // Save URLs
      saveSheetUrls({
        sheet1Url: sheet1Url.trim(),
        sheet2Url: sheet2Url.trim(),
        sheet3Url: sheet3Url.trim()
      });

      // Execute 1000-batch sync across all 3 sheets
      const result = await syncThaiBooksOnly((status) => {
        setStatusMessage(status);
      });

      if (result.allBooks && result.allBooks.length > 0) {
        setStatusMessage(
          `ดึงข้อมูลสำเร็จ! ชีท 1: ${result.sheet1Count} เล่ม, ชีท 2: ${result.sheet2Count} เล่ม, ชีท 3: ${result.sheet3Count} เล่ม (รวม ${result.allBooks.length} เล่ม)`
        );
        onSyncSuccess(result.allBooks);
        setTimeout(() => {
          onClose();
        }, 1200);
      } else {
        setErrorMessage('ไม่พบข้อมูลหนังสือในชีท กรุณาตรวจสอบสิทธิ์การแชร์หรือรูปแบบ URL');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'เกิดข้อผิดพลาดในการดึงข้อมูลจากชีท');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetDefaults = async () => {
    if (confirm('คุณต้องการรีเซ็ตกลับไปใช้ข้อมูล 3 ชีทเริ่มต้นของระบบใช่หรือไม่?')) {
      setIsLoading(true);
      resetSheetUrls();
      setSheet1Url('');
      setSheet2Url('');
      setSheet3Url('');
      setStatusMessage('กำลังคืนค่าชีทเริ่มต้น...');
      try {
        const result = await syncThaiBooksOnly();
        onSyncSuccess(result.allBooks);
        setStatusMessage('คืนค่าเริ่มต้นเรียบร้อยแล้ว');
        setTimeout(() => {
          onClose();
        }, 800);
      } catch (e) {
        setErrorMessage('เกิดข้อผิดพลาดในการคืนค่าเริ่มต้น');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div
      id="sheet-settings-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="sheet-settings-modal-container"
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">ตั้งค่าดึงข้อมูล Google Sheets (3 ชีท)</h2>
              <p className="text-xs text-slate-500">ดึงทีละ 1,000 เล่ม (หรือทั้งหมดที่มี) และแสดงผลรวมในหน้าแรก</p>
            </div>
          </div>
          <button
            type="button"
            id="close-sheet-settings-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSaveAndSync} className="p-6 overflow-y-auto space-y-5">
          {/* Info Banner */}
          <div className="p-3.5 bg-blue-50/80 rounded-2xl border border-blue-100 text-xs text-blue-900 flex items-start gap-2.5">
            <Layers className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold">ระบบรองรับหนังสือทุกเล่มจากทั้ง 3 ชีทพร้อมกัน</p>
              <p className="text-blue-700 leading-relaxed text-[11px]">
                รองรับทั้งลิงก์ Google Sheets ทั่วไป (<code className="bg-white/70 px-1 py-0.5 rounded">/edit</code>) หรือลิงก์เผยแพร่เว็บ (<code className="bg-white/70 px-1 py-0.5 rounded">/pub?output=csv</code>) ระบบจะดึงข้อมูลทีละ 1,000 เล่มอัตโนมัติ และนำมารวมแสดงผลทั้งหมดในหน้าแรก
              </p>
            </div>
          </div>

          {/* Current Counts Summary */}
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-2.5">
              <span className="text-[10px] text-slate-500 font-medium block">ชีท 1</span>
              <span className="text-sm font-bold text-blue-600">{currentSheetCounts.sheet1.toLocaleString()}</span>
              <span className="text-[9px] text-slate-400 block">เล่ม</span>
            </div>
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-2.5">
              <span className="text-[10px] text-slate-500 font-medium block">ชีท 2</span>
              <span className="text-sm font-bold text-emerald-600">{currentSheetCounts.sheet2.toLocaleString()}</span>
              <span className="text-[9px] text-slate-400 block">เล่ม</span>
            </div>
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-2.5">
              <span className="text-[10px] text-slate-500 font-medium block">ชีท 3</span>
              <span className="text-sm font-bold text-purple-600">{currentSheetCounts.sheet3.toLocaleString()}</span>
              <span className="text-[9px] text-slate-400 block">เล่ม</span>
            </div>
            <div className="bg-blue-50/60 border border-blue-200/80 rounded-2xl p-2.5">
              <span className="text-[10px] text-blue-600 font-bold block">รวมทั้งหมด</span>
              <span className="text-sm font-extrabold text-blue-700">{currentSheetCounts.total.toLocaleString()}</span>
              <span className="text-[9px] text-blue-500 block">เล่ม</span>
            </div>
          </div>

          {/* 3 URL Inputs */}
          <div className="space-y-4">
            {/* Sheet 1 */}
            <div>
              <label htmlFor="sheet-1-input" className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>
                  URL ชีท 1 (ชุดที่ 1)
                </span>
                <span className="text-[10px] font-normal text-slate-400">Google Sheets URL</span>
              </label>
              <input
                id="sheet-1-input"
                type="url"
                value={sheet1Url}
                onChange={(e) => setSheet1Url(e.target.value)}
                placeholder="https://docs.google.com/spreadsheets/d/.../edit#gid=0"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50/50 hover:bg-white transition-colors"
              />
            </div>

            {/* Sheet 2 */}
            <div>
              <label htmlFor="sheet-2-input" className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                  URL ชีท 2 (ชุดที่ 2)
                </span>
                <span className="text-[10px] font-normal text-slate-400">Google Sheets URL</span>
              </label>
              <input
                id="sheet-2-input"
                type="url"
                value={sheet2Url}
                onChange={(e) => setSheet2Url(e.target.value)}
                placeholder="https://docs.google.com/spreadsheets/d/.../edit#gid=0"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50 hover:bg-white transition-colors"
              />
            </div>

            {/* Sheet 3 */}
            <div>
              <label htmlFor="sheet-3-input" className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-500 inline-block"></span>
                  URL ชีท 3 (ชุดที่ 3)
                </span>
                <span className="text-[10px] font-normal text-slate-400">Google Sheets URL</span>
              </label>
              <input
                id="sheet-3-input"
                type="url"
                value={sheet3Url}
                onChange={(e) => setSheet3Url(e.target.value)}
                placeholder="https://docs.google.com/spreadsheets/d/.../edit#gid=0"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-slate-50/50 hover:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Status & Error Alerts */}
          {statusMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2.5">
            <button
              type="button"
              id="reset-defaults-sheet-btn"
              onClick={handleResetDefaults}
              disabled={isLoading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-xs text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              คืนค่าเริ่มต้น (3 ชีทมาตรฐาน)
            </button>

            <div className="w-full sm:w-auto flex items-center gap-2">
              <button
                type="button"
                id="cancel-sheet-settings-btn"
                onClick={onClose}
                disabled={isLoading}
                className="w-1/2 sm:w-auto text-xs text-slate-600 hover:bg-slate-100 px-4 py-2 rounded-xl transition-colors font-medium border border-slate-200"
              >
                ปิด
              </button>
              <button
                type="submit"
                id="submit-save-sync-btn"
                disabled={isLoading}
                className="w-1/2 sm:w-auto inline-flex items-center justify-center gap-1.5 text-xs text-white bg-blue-600 hover:bg-blue-700 active:scale-95 px-5 py-2 rounded-xl transition-all font-semibold shadow-md shadow-blue-600/20 disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                {isLoading ? 'กำลังดึงข้อมูล...' : 'บันทึกและดึงข้อมูล 3 ชีท'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
