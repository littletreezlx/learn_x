import java.lang.reflect.Method;

/**
 * Java 桥接运行器
 * 通过命令行参数调用 JAR 中的静态方法
 * 
 * 用法: java -cp "hello-java.jar:." JavaRunner <className> <methodName> [args...]
 */
public class JavaRunner {
    public static void main(String[] args) {
        if (args.length < 2) {
            System.err.println("Usage: JavaRunner <className> <methodName> [args...]");
            System.exit(1);
            return;
        }

        String className = args[0];
        String methodName = args[1];
        String[] methodArgs = new String[args.length - 2];
        System.arraycopy(args, 2, methodArgs, 0, methodArgs.length);

        try {
            // 加载类
            Class<?> clazz = Class.forName(className);

            // 查找方法
            Method method = null;
            for (Method m : clazz.getMethods()) {
                if (m.getName().equals(methodName)) {
                    method = m;
                    break;
                }
            }

            if (method == null) {
                System.err.println("Method not found: " + methodName);
                System.exit(1);
                return;
            }

            // 准备参数
            Class<?>[] paramTypes = method.getParameterTypes();
            Object[] params = new Object[paramTypes.length];

            for (int i = 0; i < paramTypes.length && i < methodArgs.length; i++) {
                params[i] = convertArgument(methodArgs[i], paramTypes[i]);
            }

            // 调用方法
            Object result = method.invoke(null, params);

            // 输出结果
            if (result != null) {
                System.out.println(result);
            }

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            System.exit(1);
        }
    }

    /**
     * 转换字符串参数为对应类型
     */
    private static Object convertArgument(String arg, Class<?> targetType) {
        if (targetType == String.class) {
            return arg;
        } else if (targetType == int.class || targetType == Integer.class) {
            return Integer.parseInt(arg);
        } else if (targetType == long.class || targetType == Long.class) {
            return Long.parseLong(arg);
        } else if (targetType == double.class || targetType == Double.class) {
            return Double.parseDouble(arg);
        } else if (targetType == float.class || targetType == Float.class) {
            return Float.parseFloat(arg);
        } else if (targetType == boolean.class || targetType == Boolean.class) {
            return Boolean.parseBoolean(arg);
        }
        return arg;
    }
}

