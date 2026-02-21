"use client";

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { Color } from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'
import { Highlight } from '@tiptap/extension-highlight'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import { Youtube } from '@tiptap/extension-youtube'
import { FontFamily } from '@tiptap/extension-font-family'
import { Extension } from '@tiptap/core'

import {
    Bold, Italic, Strikethrough, Underline as UnderlineIcon,
    List, ListOrdered, Quote, Heading1, Heading2, Heading3,
    AlignLeft, AlignCenter, AlignRight, AlignJustify,
    Link as LinkIcon, ImageIcon, Undo, Redo, RemoveFormatting,
    Highlighter, Palette,
    Table2, Youtube as YoutubeIcon, Code, Minus
} from 'lucide-react'

export type FontSizeOptions = {
    types: string[]
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        fontSize: {
            setFontSize: (size: string) => ReturnType
            unsetFontSize: () => ReturnType
        }
    }
}

export const FontSize = Extension.create<FontSizeOptions>({
    name: 'fontSize',
    addOptions() {
        return {
            types: ['textStyle'],
        }
    },
    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    fontSize: {
                        default: null,
                        parseHTML: element => element.style.fontSize.replace(/['"]+/g, ''),
                        renderHTML: attributes => {
                            if (!attributes.fontSize) {
                                return {}
                            }
                            return {
                                style: `font-size: ${attributes.fontSize}`,
                            }
                        },
                    },
                },
            },
        ]
    },
    addCommands() {
        return {
            setFontSize: fontSize => ({ chain }) => {
                return chain()
                    .setMark('textStyle', { fontSize })
                    .run()
            },
            unsetFontSize: () => ({ chain }) => {
                return chain()
                    .setMark('textStyle', { fontSize: null })
                    .removeEmptyTextStyle()
                    .run()
            },
        }
    },
})

const FONT_SIZES = ['10px', '12px', '14px', '16px', '18px', '20px', '24px', '30px', '36px', '48px', '64px', '72px'];

interface TipTapEditorProps {
    value: string;
    onChange: (value: string) => void;
}

export default function TipTapEditor({ value, onChange }: TipTapEditorProps) {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit,
            Underline,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Link.configure({
                openOnClick: false,
                autolink: true,
                defaultProtocol: 'https',
            }),
            Image.configure({
                inline: true,
                allowBase64: true,
            }),
            TextStyle,
            Color,
            Highlight.configure({ multicolor: true }),
            FontFamily,
            FontSize,
            Table.configure({ resizable: true }),
            TableRow,
            TableHeader,
            TableCell,
            Youtube.configure({
                inline: false,
                width: 640,
                height: 480,
            }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose-base dark:prose-invert prose-blue max-w-none focus:outline-none min-h-[300px] p-4',
            },
        },
    });

    if (!editor) {
        return null;
    }

    const setLink = () => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL Girin:', previousUrl);

        if (url === null) {
            return;
        }

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()
            return;
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    const addImage = () => {
        const url = window.prompt('Görsel URL adresini girin:');

        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    const addYoutubeVideo = () => {
        const url = prompt('YouTube Video Linki:');
        if (url) {
            editor.commands.setYoutubeVideo({ src: url });
        }
    };

    const insertTable = () => {
        editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
    };

    const FONT_FAMILIES = [
        { name: 'Varsayılan Font', value: '' },
        { name: 'Arial', value: 'Arial, sans-serif' },
        { name: 'Times New Roman', value: '"Times New Roman", serif' },
        { name: 'Courier New', value: '"Courier New", monospace' },
        { name: 'Georgia', value: 'Georgia, serif' },
        { name: 'Verdana', value: 'Verdana, sans-serif' },
    ];

    const ToolbarButton = ({ onClick, isActive = false, disabled = false, children, title }: {
        onClick: () => void;
        isActive?: boolean;
        disabled?: boolean;
        children: React.ReactNode;
        title?: string;
    }) => (
        <button
            type="button"
            onClick={onClick}
            onMouseDown={(e) => e.preventDefault()}
            disabled={disabled}
            title={title}
            className={`p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors ${isActive ? 'bg-slate-200 dark:bg-slate-600 text-primary dark:text-blue-400' : 'text-slate-600 dark:text-slate-300'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {children}
        </button>
    );

    return (
        <div className="border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#1a2632] rounded-lg overflow-hidden flex flex-col focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all">
            {/* Toolbar */}
            <div className="flex flex-col border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                {/* Top Row: History & Menus */}
                <div className="flex flex-wrap items-center gap-2 p-2 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-1 border-r border-slate-200 dark:border-slate-700 pr-2">
                        <ToolbarButton
                            onClick={() => editor.chain().focus().undo().run()}
                            disabled={!editor.can().chain().focus().undo().run()}
                            title="Geri Al"
                        >
                            <Undo className="w-4 h-4" />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().redo().run()}
                            disabled={!editor.can().chain().focus().redo().run()}
                            title="İleri Al"
                        >
                            <Redo className="w-4 h-4" />
                        </ToolbarButton>
                    </div>

                    {/* Font Family */}
                    <select
                        className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300 font-medium focus:outline-none focus:ring-1 focus:ring-primary rounded-md p-1.5 transition-colors max-w-[140px]"
                        onChange={(e) => {
                            if (e.target.value) {
                                editor.chain().focus().setFontFamily(e.target.value).run();
                            } else {
                                editor.chain().focus().unsetFontFamily().run();
                            }
                        }}
                        value={editor.getAttributes('textStyle').fontFamily || ''}
                        title="Yazı Tipi"
                    >
                        {FONT_FAMILIES.map(font => (
                            <option key={font.name} value={font.value}>{font.name}</option>
                        ))}
                    </select>

                    {/* Font Size */}
                    <select
                        className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300 font-medium focus:outline-none focus:ring-1 focus:ring-primary rounded-md p-1.5 transition-colors"
                        onChange={(e) => {
                            if (e.target.value) {
                                editor.chain().focus().setFontSize(e.target.value).run();
                            } else {
                                editor.chain().focus().unsetFontSize().run();
                            }
                        }}
                        value={editor.getAttributes('textStyle').fontSize || ''}
                        title="Yazı Boyutu"
                    >
                        <option value="">Varsayılan</option>
                        {FONT_SIZES.map(size => (
                            <option key={size} value={size}>{size}</option>
                        ))}
                    </select>

                    <div className="w-px h-4 bg-slate-300 dark:bg-slate-600 mx-1"></div>

                    {/* Colors & Highlight */}
                    <label className="cursor-pointer p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors text-slate-600 dark:text-slate-300 relative border border-transparent hover:border-slate-200 dark:hover:border-slate-600" title="Metin Rengi">
                        <Palette className="w-4 h-4" />
                        <input
                            type="color"
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            onInput={event => (editor.chain().focus() as any).setColor((event.target as HTMLInputElement).value).run()}
                            value={editor.getAttributes('textStyle').color || '#000000'}
                            className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                        />
                    </label>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleHighlight().run()}
                        isActive={editor.isActive('highlight')}
                        title="Vurgula (Fosforlu)"
                    >
                        <Highlighter className="w-4 h-4" />
                    </ToolbarButton>
                </div>

                {/* Bottom Row: Core Tools */}
                <div className="flex flex-wrap items-center gap-1 p-2">
                    {/* Text Formatting */}
                    <div className="flex items-center gap-1 pr-2 border-r border-slate-200 dark:border-slate-700">
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            disabled={!editor.can().chain().focus().toggleBold().run()}
                            isActive={editor.isActive('bold')}
                            title="Kalın"
                        >
                            <Bold className="w-4 h-4" />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            disabled={!editor.can().chain().focus().toggleItalic().run()}
                            isActive={editor.isActive('italic')}
                            title="İtalik"
                        >
                            <Italic className="w-4 h-4" />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleUnderline().run()}
                            disabled={!editor.can().chain().focus().toggleUnderline().run()}
                            isActive={editor.isActive('underline')}
                            title="Altı Çizili"
                        >
                            <UnderlineIcon className="w-4 h-4" />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleStrike().run()}
                            disabled={!editor.can().chain().focus().toggleStrike().run()}
                            isActive={editor.isActive('strike')}
                            title="Üstü Çizili"
                        >
                            <Strikethrough className="w-4 h-4" />
                        </ToolbarButton>
                    </div>

                    {/* Headings */}
                    <div className="flex items-center gap-1 px-2 border-r border-slate-200 dark:border-slate-700">
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                            isActive={editor.isActive('heading', { level: 1 })}
                            title="Başlık 1"
                        >
                            <Heading1 className="w-4 h-4" />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                            isActive={editor.isActive('heading', { level: 2 })}
                            title="Başlık 2"
                        >
                            <Heading2 className="w-4 h-4" />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                            isActive={editor.isActive('heading', { level: 3 })}
                            title="Başlık 3"
                        >
                            <Heading3 className="w-4 h-4" />
                        </ToolbarButton>
                    </div>

                    {/* Alignment */}
                    <div className="flex items-center gap-1 px-2 border-r border-slate-200 dark:border-slate-700">
                        <ToolbarButton
                            onClick={() => editor.chain().focus().setTextAlign('left').run()}
                            isActive={editor.isActive({ textAlign: 'left' })}
                            title="Sola Yasla"
                        >
                            <AlignLeft className="w-4 h-4" />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().setTextAlign('center').run()}
                            isActive={editor.isActive({ textAlign: 'center' })}
                            title="Ortala"
                        >
                            <AlignCenter className="w-4 h-4" />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().setTextAlign('right').run()}
                            isActive={editor.isActive({ textAlign: 'right' })}
                            title="Sağa Yasla"
                        >
                            <AlignRight className="w-4 h-4" />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                            isActive={editor.isActive({ textAlign: 'justify' })}
                            title="İki Yana Yasla"
                        >
                            <AlignJustify className="w-4 h-4" />
                        </ToolbarButton>
                    </div>

                    {/* Objects (Lists, Quotes, Rules) */}
                    <div className="flex items-center gap-1 px-2 border-r border-slate-200 dark:border-slate-700">
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            isActive={editor.isActive('bulletList')}
                            title="Madde İşaretli Liste"
                        >
                            <List className="w-4 h-4" />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleOrderedList().run()}
                            isActive={editor.isActive('orderedList')}
                            title="Numaralı Liste"
                        >
                            <ListOrdered className="w-4 h-4" />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleBlockquote().run()}
                            isActive={editor.isActive('blockquote')}
                            title="Alıntı"
                        >
                            <Quote className="w-4 h-4" />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                            isActive={editor.isActive('codeBlock')}
                            title="Kod Bloğu"
                        >
                            <Code className="w-4 h-4" />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().setHorizontalRule().run()}
                            title="Ayırıcı Çizgi"
                        >
                            <Minus className="w-4 h-4" />
                        </ToolbarButton>
                    </div>

                    {/* Media, Links & Tables */}
                    <div className="flex items-center gap-1 px-2 border-r border-slate-200 dark:border-slate-700">
                        <ToolbarButton
                            onClick={setLink}
                            isActive={editor.isActive('link')}
                            title="Bağlantı Ekle"
                        >
                            <LinkIcon className="w-4 h-4" />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={addImage}
                            title="Görsel Ekle"
                        >
                            <ImageIcon className="w-4 h-4" />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={addYoutubeVideo}
                            title="YouTube Videosu Ekle"
                        >
                            <YoutubeIcon className="w-4 h-4" />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={insertTable}
                            title="Tablo Ekle"
                        >
                            <Table2 className="w-4 h-4" />
                        </ToolbarButton>
                    </div>

                    {/* Clear Format */}
                    <div className="flex items-center gap-1 px-2">
                        <ToolbarButton
                            onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
                            title="Bütün Biçimlendirmeleri Temizle"
                        >
                            <RemoveFormatting className="w-4 h-4" />
                        </ToolbarButton>
                    </div>
                </div>
            </div>

            {/* Editor Content Area */}
            <div className="flex-grow overflow-y-auto max-h-[600px] cursor-text" onClick={() => editor.chain().focus().run()}>
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}
