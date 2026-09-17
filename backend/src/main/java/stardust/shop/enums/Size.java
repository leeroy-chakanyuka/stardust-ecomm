package stardust.shop.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum Size {
    S("S"),
    M("M"),
    L("L"),
    XL("XL"),
    XXL("XXL"),

    Y2_4("2-4Y"),
    Y5_8("5-8Y"),
    Y9_12("9-12Y"),

    UK6("UK 6"),
    UK7("UK 7"),
    UK8("UK 8"),
    UK9("UK 9"),
    UK10("UK 10"),
    UK11("UK 11"),

    ONE_SIZE("One Size");

    private final String code;

    Size(String code) {
        this.code = code;
    }

    @JsonValue
    public String getCode() {
        return code;
    }

    @JsonCreator
    public static Size fromCode(String code) {
        if (code == null) return null;
        for (Size s : values()) {
            if (s.code.equalsIgnoreCase(code.trim())) return s;
        }
        throw new IllegalArgumentException("Unknown size: " + code);
    }
}
