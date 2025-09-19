import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error('NEXT_PUBLIC_GEMINI_API_KEY is not configured');
}

const genAI = new GoogleGenerativeAI(API_KEY);

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export class GeminiChat {
  private model;
  private chat;

  constructor() {
    this.model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      },
    });

    // System prompt for car repair context
    const systemPrompt = `Bạn là trợ lý AI chuyên về sửa chữa xe máy của "Sửa Xe Hồng Hậu".

    THÔNG TIN CỬA HÀNG:
    - Tên: Sửa Xe Hồng Hậu
    - Địa chỉ: 541 Trần Hưng Đạo, Phường Phú Lợi, TP Cần Thơ
    - Số điện thoại: 033-803-7868
    - Email: suaxehonghau@gmail.com
    - Giờ làm việc: 7:00 - 19:00 (Thứ 2 - Thứ 7), 8:00 - 17:00 (Chủ nhật)

    DỊCH VỤ BẢO DƯỠNG ĐỊNH KỲ:
    - Kiểm tra thắng trước/sau: 50.000đ (30 phút)
    - Thay nhớt máy: 120.000đ (30 phút) - Rất phổ biến
    - Thay nhớt số: 80.000đ (30 phút)
    - Kiểm tra nước làm mát: 40.000đ (30 phút)
    - Vệ sinh họng ga: 70.000đ (30 phút)
    - Vệ sinh kim phun: 150.000đ (30 phút)
    - Vệ sinh lọc gió: 30.000đ (30 phút)
    - Vệ sinh nồi: 200.000đ (30 phút)
    - Vô dầu dây ga: 25.000đ (30 phút)
    - Vô dầu dây thắng: 25.000đ (30 phút)
    - Vô mỡ bò chén cổ: 40.000đ (30 phút)
    - Kiểm tra bạc đạn: 60.000đ (30 phút)
    - Kiểm tra phuộc: 80.000đ (30 phút)
    - Kiểm tra báo xăng: 45.000đ (30 phút)
    - Kiểm tra dây công-tơ-mét: 50.000đ (30 phút)
    - Rửa xe toàn bộ: 35.000đ (30 phút)
    - Kiểm tra hệ thống điện: 90.000đ (30 phút)
    - Kiểm tra sườn xe: 70.000đ (30 phút)
    - Kiểm tra bánh xe: 55.000đ (30 phút)
    - Kiểm tra lốp: 40.000đ (30 phút)
    - Kiểm tra căm, niềng: 65.000đ (30 phút)
    - Kiểm tra nhông – sên – dĩa: 85.000đ (30 phút)

    DỊCH VỤ BẢO DƯỠNG TOÀN DIỆN:
    - Kiểm tra tổng quát bảo dưỡng toàn diện: 250.000đ (2 giờ)
    - Bảo dưỡng toàn diện trong 1–2 ngày: 800.000đ - 1.500.000đ
    - Đại tu theo yêu cầu: 1.500.000đ - 5.000.000đ (2-3 ngày)

    DỊCH VỤ ĐẶC BIỆT:
    - Nhận xe tại nhà – sửa xe tại nhà: 100.000đ - 500.000đ (3 giờ)
    - Hỗ trợ khách hàng lỡ đường: 150.000đ (1 giờ)
    - Giao – nhận xe tận nơi: 80.000đ (1.5 giờ)

    CHÍNH SÁCH:
    - Bảo hành: 3-6 tháng tùy dịch vụ
    - Kiểm tra miễn phí trước khi sửa
    - Báo giá trước khi thực hiện
    - Thanh toán: Tiền mặt, chuyển khoản

    Hãy trả lời thân thiện, chuyên nghiệp bằng tiếng Việt.
    Khi khách hỏi về giá, đưa ra giá cụ thể từ danh sách trên.
    Khi khách muốn đặt lịch, hướng dẫn họ gọi số 033-803-7868 hoặc đặt lịch online trên website.
    Địa chỉ cụ thể: 541 Trần Hưng Đạo, Phường Phú Lợi, TP Cần Thơ.`;

    this.chat = this.model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: systemPrompt }],
        },
        {
          role: 'model',
          parts: [
            {
              text: 'Xin chào! Tôi là trợ lý AI của Sửa Xe Hồng Hậu. Tôi có thể hỗ trợ bạn về các dịch vụ sửa chữa xe máy. Bạn cần tư vấn gì ạ?',
            },
          ],
        },
      ],
    });
  }

  async sendMessage(message: string): Promise<string> {
    try {
      const result = await this.chat.sendMessage(message);
      const response = await result.response;
      let text = response.text();

      // Remove markdown formatting
      text = text.replace(/\*\*(.*?)\*\*/g, '$1'); // Remove bold **text**
      text = text.replace(/\*(.*?)\*/g, '$1'); // Remove italic *text*
      text = text.replace(/#{1,6}\s/g, ''); // Remove headers
      text = text.replace(/```[\s\S]*?```/g, ''); // Remove code blocks
      text = text.replace(/`(.*?)`/g, '$1'); // Remove inline code
      text = text.replace(/^\* /gm, '• '); // Replace * with bullet point
      text = text.replace(/^\d+\. /gm, ''); // Remove numbered lists
      text = text.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1'); // Remove links

      return text.trim();
    } catch (error) {
      console.error('Gemini API Error:', error);
      return 'Xin lỗi, tôi đang gặp sự cố kỹ thuật. Vui lòng thử lại sau hoặc liên hệ trực tiếp với tiệm để được hỗ trợ.';
    }
  }

  resetChat() {
    // Restart chat session
    const systemPrompt = `Bạn là trợ lý AI chuyên về sửa chữa xe máy của "Sửa Xe Hồng Hậu".
    Địa chỉ: 541 Trần Hưng Đạo, Phường Phú Lợi, TP Cần Thơ.
    Số điện thoại: 033-803-7868.`;

    this.chat = this.model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: systemPrompt }],
        },
        {
          role: 'model',
          parts: [
            {
              text: 'Xin chào! Tôi là trợ lý AI của Sửa Xe Hồng Hậu. Tôi có thể hỗ trợ bạn về các dịch vụ sửa chữa xe máy, báo giá, hoặc hướng dẫn đặt lịch. Bạn cần tư vấn gì ạ?',
            },
          ],
        },
      ],
    });
  }
}

export const geminiChat = new GeminiChat();
