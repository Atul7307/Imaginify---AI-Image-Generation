'use client'; // This directive is necessary for using client-side hooks in Next.js App Router

import React, { useState, FC } from 'react';
import { useForm, useFieldArray, useController, Controller, Control } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// --- TYPE DEFINITIONS ---
type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary';
type ButtonSize = 'default' | 'sm' | 'icon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

// --- ZOD SCHEMA & FORM TYPES ---
const fieldSchema: z.ZodType<FieldSchema> = z.object({
  key: z.string().min(1, "Key cannot be empty"),
  type: z.enum(['String', 'Number', 'Nested', 'Boolean', 'Array']),
  children: z.lazy((): z.ZodArray<z.ZodType<FieldSchema>> => fieldSchema.array()).optional(),
});

type FieldSchema = {
  key: string;
  type: 'String' | 'Number' | 'Nested' | 'Boolean' | 'Array';
  children?: FieldSchema[];
};

const formSchema = z.object({
  fields: z.array(fieldSchema),
});

type FormSchema = z.infer<typeof formSchema>;


// --- UI COMPONENTS ---
const Button: FC<ButtonProps> = ({ children, variant = 'default', size = 'default', className = '', ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  const variants: Record<ButtonVariant, string> = {
    default: "bg-slate-900 text-slate-50 hover:bg-slate-900/90",
    destructive: "bg-red-500 text-slate-50 hover:bg-red-500/90",
    outline: "border border-slate-200 bg-transparent hover:bg-slate-100 hover:text-slate-900",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-100/80",
  };
  const sizes: Record<ButtonSize, string> = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    icon: "h-10 w-10",
  };
  return <button className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>{children}</button>;
};

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => <input className={`flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`} ref={ref} {...props} />);
const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({ className, ...props }, ref) => <textarea className={`flex min-h-[80px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`} ref={ref} {...props} />);
const Select = React.forwardRef<HTMLSelectElement, { options: { value: string; label: string; }[]; placeholder?: string } & React.SelectHTMLAttributes<HTMLSelectElement>>(({ className, options, placeholder, ...props }, ref) => <select className={`flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`} ref={ref} {...props}>{placeholder && <option value="" disabled>{placeholder}</option>}{options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select>);
const Card: FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => <div className={`rounded-lg border bg-white shadow-sm ${className}`}>{children}</div>;
const CardContent: FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => <div className={`p-6 ${className}`}>{children}</div>;
const Trash2: FC<React.SVGProps<SVGSVGElement>> = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>;
const Loader2: FC<React.SVGProps<SVGSVGElement>> = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>;
const Clipboard: FC<React.SVGProps<SVGSVGElement>> = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>;

// --- RECURSIVE FIELD COMPONENT ---
interface SchemaFieldProps {
  control: Control<FormSchema>;
  path: string;
  remove: () => void;
}

const SchemaField: FC<SchemaFieldProps> = ({ control, path, remove }) => {
  const { field: keyField } = useController({ name: `${path}.key` as any, control });
  const { field: typeField } = useController({ name: `${path}.type` as any, control });
  const { fields, append, remove: removeChild } = useFieldArray({ control, name: `${path}.children` as any });
  const typeOptions = [{ value: 'String', label: 'String' }, { value: 'Number', label: 'Number' }, { value: 'Boolean', label: 'Boolean' }, { value: 'Array', label: 'Array' }, { value: 'Nested', label: 'Nested Object' }];
  const isNested = typeField.value === 'Nested' || typeField.value === 'Array';

  return (
    <div className="p-4 border rounded-lg bg-slate-50/50 space-y-4">
      <div className="flex items-center space-x-2">
        <Input placeholder="Field Name" {...keyField} className="flex-grow bg-white" />
        <Controller control={control} name={`${path}.type` as any} render={({ field }) => <Select {...field} options={typeOptions} className="w-48 bg-white" />} />
        <Button onClick={remove} variant="destructive" size="icon"><Trash2 className="h-4 w-4" /></Button>
      </div>
      {isNested && (
        <div className="ml-6 pl-4 border-l-2 space-y-4">
          <p className="text-xs text-slate-500 -mb-2">{typeField.value === 'Array' ? 'Define one item to represent all items in the array:' : 'Define the nested fields:'}</p>
          {fields.map((field, index) => <SchemaField key={field.id} control={control} path={`${path}.children.${index}`} remove={() => removeChild(index)} />)}
          <Button onClick={() => append({ key: fields.length > 0 ? '' : 'item', type: 'String', children: [] })} variant="outline" size="sm">{typeField.value === 'Array' ? 'Define Array Item' : 'Add Nested Field'}</Button>
        </div>
      )}
    </div>
  );
};

// --- JSON UTILITY ---
const generateStructureJson = (fields: FieldSchema[] | undefined): Record<string, any> | any[] => {
  if (!fields || fields.length === 0) return {};
  const isArray = fields.length === 1 && fields[0].key === 'item';
  if (isArray) {
    if (fields[0].type === 'Nested') return [generateStructureJson(fields[0].children)];
    switch (fields[0].type) {
      case 'String': return ["(string)"];
      case 'Number': return [0];
      case 'Boolean': return [true];
      default: return [];
    }
  }
  return fields.reduce((acc, field) => {
    if (!field.key) return acc;
    switch (field.type) {
      case 'String': acc[field.key] = "(string)"; break;
      case 'Number': acc[field.key] = 0; break;
      case 'Boolean': acc[field.key] = true; break;
      case 'Array': acc[field.key] = generateStructureJson(field.children); break;
      case 'Nested': acc[field.key] = generateStructureJson(field.children); break;
    }
    return acc;
  }, {} as Record<string, any>);
};

// *** FIX: Re-added the missing JsonPreview component definition ***
const JsonPreview: FC<{ data: string }> = ({ data }) => (
  <pre className="w-full text-sm bg-slate-900 text-slate-50 p-4 rounded-md overflow-x-auto h-full">
    <code>{data}</code>
  </pre>
);

// --- MAIN PAGE COMPONENT ---
export default function JsonCreatorPage() {
  const [loading, setLoading] = useState<('suggest' | 'generate' | null)>(null);
  const [apiError, setApiError] = useState('');
  const [suggestionPrompt, setSuggestionPrompt] = useState('');
  const [generatedSampleData, setGeneratedSampleData] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { fields: [] },
  });
  
  const { fields, append, remove } = useFieldArray({ control: form.control, name: "fields" });
  const watchedFields = form.watch('fields');
  const structureJson = JSON.stringify(generateStructureJson(watchedFields), null, 2);
  const finalJsonOutput = generatedSampleData || structureJson;

  const sanatizeAiResponse = (text: string) => text.replace(/^```json\n?|```$/g, '').trim();

  const handleApiCall = async (type: 'suggest' | 'generate', prompt: string) => {
    setLoading(type);
    setApiError('');
    try {
      const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) throw new Error("NEXT_PUBLIC_GEMINI_API_KEY is not set.");
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
      
      const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const responseData = await response.json();
      if (!response.ok) throw new Error(responseData.error?.message || "Unknown API error");

      const textContent = responseData.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!textContent) throw new Error("API response was empty.");

      const sanitizedText = sanatizeAiResponse(textContent);
      const parsedJson = JSON.parse(sanitizedText);
      
      if (type === 'suggest') {
        if (parsedJson.fields) form.reset({ fields: parsedJson.fields });
        else throw new Error("AI response for schema suggestion is missing the 'fields' property.");
        setGeneratedSampleData(null); // Clear old sample data
      } else {
        setGeneratedSampleData(JSON.stringify(parsedJson, null, 2));
      }
    } catch (error: any) {
        setApiError(error.message);
    } finally {
        setLoading(null);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(finalJsonOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="bg-slate-50 min-h-screen font-sans">
      <div className="container mx-auto p-4 md:p-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800">AI-Powered JSON Generator</h1>
          <p className="text-slate-600 mt-2">Describe a data structure, and see the schema and sample data in real-time.</p>
        </header>

        {apiError && <Card className="w-full max-w-6xl mx-auto mb-4 bg-red-100 border-red-500"><CardContent className="pt-6 text-red-800"><p><strong>Error:</strong> {apiError}</p></CardContent></Card>}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="flex flex-col gap-6">
            <Card>
              <CardContent className="space-y-4 pt-6">
                <label htmlFor="suggestion" className="text-sm font-medium">1. Describe your schema to get started</label>
                <Textarea id="suggestion" placeholder="A user with a name, an array of friends, and a nested address object..." value={suggestionPrompt} onChange={(e) => setSuggestionPrompt(e.target.value)} />
                <Button onClick={() => handleApiCall('suggest', `Based on the description: "${suggestionPrompt}", generate a JSON object with a "fields" key. Each object must have "key", "type" (one of 'String', 'Number', 'Boolean', 'Array', 'Nested'), and "children". Output ONLY the raw JSON object. Never use markdown.`)} disabled={!!loading || !suggestionPrompt}>
                    {loading === 'suggest' ? <><Loader2 className="mr-2 h-4 w-4" /> Suggesting...</> : '✨ Suggest Schema'}
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-slate-700">2. Edit Schema</h2>
                <Button variant="destructive" size="sm" onClick={() => { form.reset({ fields: [] }); setGeneratedSampleData(null); }}>Clear All</Button>
              </div>
              {fields.length > 0 ? fields.map((field, index) => <SchemaField key={field.id} control={form.control} path={`fields.${index}`} remove={() => { remove(index); setGeneratedSampleData(null); }} />) : <p className="text-sm text-slate-500 text-center py-4">Your schema is empty.</p>}
              <Button onClick={() => append({ key: '', type: 'String', children: [] })} variant="secondary">Add Top-Level Field</Button>
            </div>
          </div>
          
          <div className="flex flex-col">
            <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
              <h2 className="text-xl font-semibold text-slate-700">3. Preview & Generate</h2>
              <div className="flex gap-2">
                <Button variant="default" size="sm" onClick={() => handleApiCall('generate', `Based on this JSON structure: ${structureJson}, generate one realistic example. The output must be ONLY the raw JSON object and nothing else.`)} disabled={!!loading || watchedFields.length === 0}>
                  {loading === 'generate' ? <><Loader2 className="mr-2 h-4 w-4" /> Generating...</> : '✨ Generate Sample Data'}
                </Button>
                <Button variant="outline" size="sm" onClick={handleCopy} disabled={!!loading}>
                  <Clipboard className="mr-2 h-4 w-4" />{copied ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            </div>
            <Card className="flex-grow min-h-[400px]">
              <JsonPreview data={finalJsonOutput} />
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}